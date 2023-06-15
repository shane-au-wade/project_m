import { ChromaClient } from 'chromadb'
import { OPENAI_API_KEY, CHROMADB_URL } from './config'

import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

const client = new ChromaClient({
  path: CHROMADB_URL,
})

const collection_config = { name: 'fasb' }

const thread = []

// ids = [[1,2,3],[1],[2,3,4],...]
function filterQueryResults(ids, docs, metadatas, n = 10) {
  const id_map = {}
  const frequency_map = {}

  // create id, frequency map
  ids.forEach((id_arr) => {
    id_arr.forEach((id) => {
      if (!(id in id_map)) id_map[id] = 1
      id_map[id] = id_map[id] + 1
    })
  })

  // create frequency, id map from id_map
  Object.keys(id_map).forEach((id) => {
    const frequency = parseInt(id_map[id])
    if (!(frequency in frequency_map)) frequency_map[frequency] = []
    frequency_map[frequency].push(id)
  })

  // collect the first N relevant docs, order by document frequency
  const relevant_ids = []
  const frequency_keys = Object.keys(frequency_map)
  frequency_keys
    .sort((a, b) => b - a)
    .forEach((key) => {
      frequency_map[key].forEach((id) => {
        if (relevant_ids.length == n) return
        relevant_ids.push(id)
      })
    })

  const flat_ids = ids.flat()
  const flat_docs = docs.flat()
  const flat_metadats = metadatas.flat()
  const rows = flat_ids.map((id, index) => {
    return [id, flat_docs[index], flat_metadats[index]]
  })

  const relevant_docs = relevant_ids.map((id) => {
    const index = rows.findIndex((row) => row[0] == id)
    return rows[index][1]
  })

  const relevant_metadatas = relevant_ids.map((id) => {
    const index = rows.findIndex((row) => row[0] == id)
    return rows[index][2]
  })

  return [relevant_ids, relevant_docs, relevant_metadatas]
}

function formatDocs(ids, documents, metadatas) {
  const text = []
  for (const [index, doc] of documents.entries()) {
    text.push(`ASC Topic ${doc}\n`)
  }
  return text.join('\n')
}

function getChatPrompt(query, docs_text) {
  //   return `
  // FASB CODIFICATION
  // ---
  // ${docs_text}
  // ---
  // ${query}
  // Please cite the specific topic numbers. Please use direct quotes from the topics to support your answer.
  // `

  return `${query}`
}

function getChatSystemPrompt(docs_text) {
  return `
Relevant ASC Topics
${docs_text}

You are an expert financial accounting AI
You help people with accounting standards codification (ASC) questions
Read the Relevant ASC Topics to answer the questions
If the Relevant ASC Topics do not contain the necessary information DO NOT ANSWER 
Please cite the specific topic numbers.
`
}

function getVseoPrompt(query) {
  return `Act as a Vector Database Search Engineer Optimizer (VSEO).  VSEO or vector search engine optimization involves creating inputs for a vector db query such that you receive high quality results.  A high quality result is defined as receiving all relevant documents contained within the db that related to all of the aspects present in the initial string input. 

In summary, you will receive a text input and then create a collection of new string inputs that will be used in a vector database query.

---
INPUT:
What is the best method to grow organic tomatoes in an urban garden?

NEW QUERY STRINGS:
["Organic tomato cultivation methods",
"Growing tomatoes in urban settings",
"Best practices for urban gardening with tomatoes"]
---

INPUT:
${query}

NEW QUERY STRINGS:
`
}

function findAscTopicNumber(str) {
  // The regex matches numbers separated by dashes, up to 4 segments (e.g. 606, 840-30, 707-10-10, 101-10-10-1)
  const match = str.match(/(\d+(-\d+){0,3})/)
  return match ? match[0] : null
}

export async function converse(query) {
  thread.push({
    role: 'user',
    content: query,
  })

  const user_messages = thread.filter((chat) => chat.role == 'user')

  console.log('INFO: generating response, please wait...')

  // asc topic extraction
  const topic = findAscTopicNumber(query)

  console.log('INFO: asc topic detected: ', topic)

  // VSEO
  const vseo_prompt = getVseoPrompt(query)
  const vseo_response = await fetch('https://api.openai.com/v1/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: vseo_prompt,
      temperature: 1,
      max_tokens: 512,
      top_p: 1,
      frequency_penalty: 2,
      presence_penalty: 0,
    }),
  })
  const vseo_json = await vseo_response.json()
  const vseo_query_strings = JSON.parse(vseo_json.choices[0].text.trim()) ?? []

  vseo_query_strings.push(query)

  console.log('INFO: vseo_query_strings', vseo_query_strings)

  const query_embeddings = []
  for (const query_string of vseo_query_strings) {
    // embed query
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY ?? ''}`,
      },
      method: 'POST',
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: query_string,
      }),
    })
    const response_data = await response.json()
    const query_embedding = response_data.data[0].embedding
    query_embeddings.push(query_embedding)
  }

  console.log('INFO: embedded query strings')


  // ------

  const _chat_system = getChatSystemPrompt('docs_text')

  const completion_playload = {
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: _chat_system,
      },
      ...thread.slice(-5),
    ],
  }

  return OpenAIChatCompletionStream(completion_playload)

  // -------



  // find relevant documents
  const fasb_collection = await client.getCollection(collection_config)
  const result = await fasb_collection.query({
    queryEmbeddings: query_embeddings,
    nResults: 10,
  })

  console.log('INFO: chroma query results', result.ids)

  let [relevant_ids, relevant_docs, relevant_metadatas] = filterQueryResults(
    result.ids,
    result.documents,
    result.metadatas,
    5
  )

  if (topic) {
    const topic_results = await fasb_collection.get({
      limit: 100,
      whereDocument: { $contains: `#${topic}` },
    })

    console.log('INFO: chroma topic query results', topic_results.ids)

    const max_docs = 5

    const topic_ids = []
    const topics_docs = []
    const topic_metadatas = []

    for (const [index, id] of topic_results.ids.entries()) {
      if (id.includes(topic) && topic_ids.length < max_docs) {
        topic_ids.push(id)
        topics_docs.push(topic_results.documents[index])
        topic_metadatas.push(topic_results.metadatas[index])
      }
    }

    console.log('INFO: chroma topic query filtered results', topic_ids)

    relevant_ids.push(...topic_ids)
    relevant_docs.push(...topics_docs)
    relevant_metadatas.push(...topic_metadatas)
  }

  console.log('INFO: relevant_ids', relevant_ids)

  const docs_text = formatDocs(relevant_ids, relevant_docs, relevant_metadatas)

  const chat_prompt = getChatPrompt(query, docs_text)

  const chat_system = getChatSystemPrompt(docs_text)

  console.log('INFO: chat system prompt', chat_system)

  //check if atleast one entry contains the topic substring
  const good_query = topic
    ? relevant_ids.some((id) => {
        return id.toLowerCase().includes(topic.toLowerCase())
      })
    : true

  console.log('INFO: relevant ids contain topic? ', good_query)

  if (good_query) {
    const completion_playload = {
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: chat_system,
        },
        ...thread.slice(-5),
      ],
    }
    // const stream = await

    // // thread.push(ai_response)

    return OpenAIChatCompletionStream(completion_playload)
  }

  return `The system was unable to find ${topic}.  The topic number is incorrect or we are missing some data.`
}

export interface OpenAIStreamPayload {
  model: string
  messages: ChatGPTMessage[]
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  max_tokens: number
  stream: boolean
  n: number
}

export type ChatGPTAgent = 'user' | 'system'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

export interface OpenAIStreamPayload {
  model: string
  messages: ChatGPTMessage[]
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  max_tokens: number
  stream: boolean
  n: number
}

export async function OpenAIChatCompletionStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const readableStream = new ReadableStream({
    async start(controller) {
      // callback
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data
          controller.enqueue(encoder.encode(data))
        }
      }

      // optimistic error handling
      if (res.status !== 200) {
        const data = {
          status: res.status,
          statusText: res.statusText,
          body: await res.text(),
        }
        console.log(`Error: recieved non-200 status code, ${JSON.stringify(data)}`)
        controller.close()
        return
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  let counter = 0
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      const data = decoder.decode(chunk)
      // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
      if (data === '[DONE]') {
        controller.terminate()
        return
      }
      try {
        const json = JSON.parse(data)
        const text = json.choices[0].delta?.content || ''
        if (counter < 2 && (text.match(/\n/) || []).length) {
          // this is a prefix character (i.e., "\n\n"), do nothing
          return
        }
        // stream transformed JSON resposne as SSE
        const payload = { text: text }
        // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`))
        counter++
      } catch (e) {
        // maybe parse error
        controller.error(e)
      }
    },
  })

  return readableStream.pipeThrough(transformStream)
}
