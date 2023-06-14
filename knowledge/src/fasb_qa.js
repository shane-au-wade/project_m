const readline = require('readline')
const { ChromaClient } = require('chromadb')
const { Configuration, OpenAIApi } = require('openai')

const { OPENAI_API_KEY } = require('./config')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)
const client = new ChromaClient()

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
    text.push(`${ids[index]}\n${doc}\n`)
  }
  return text.join('\n')
}

function getChatPrompt(query, docs_text) {
  return `
FASB CODIFICATION
---
${docs_text}
---
${query}
Please cite the specific topic numbers. Please use direct quotes from the topics to support your answer.
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

async function converse(query) {
  thread.push({
    role: 'user',
    content: query,
  })

  console.log('INFO: generating response, please wait...')

  // asc topic extraction
  const topic = findAscTopicNumber(query)
  console.log('INFO: asc topic detected: ', topic)

  //   // VSEO
  //   const vseo_prompt = getVseoPrompt(query)
  //   const veso_result = await openai.createCompletion({
  //     model: 'text-davinci-003',
  //     prompt: vseo_prompt,
  //     temperature: 1,
  //     max_tokens: 512,
  //     top_p: 1,
  //     frequency_penalty: 2,
  //     presence_penalty: 0,
  //   })
  //   const vseo_query_strings = JSON.parse(veso_result.data.choices[0].text.trim()) ?? []

  const vseo_query_strings = []

  vseo_query_strings.push(query)

  console.log('INFO: vseo_query_strings', vseo_query_strings)

  const query_embeddings = []
  for (const query_string of vseo_query_strings) {
    // embed query
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: query_string,
    })
    const query_embedding = response.data.data[0].embedding
    query_embeddings.push(query_embedding)
  }

  console.log('INFO: embedded query strings')

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
      limit: 10,
      whereDocument: { $contains: topic },
    })

    console.log(topic_results)

    console.log('INFO: chroma topic query results', topic_results.ids)

    const topic_ids = []
    const topics_docs = []
    const topic_metadatas = []

    for (const [index, id] of topic_results.ids.entries()) {
      if (id.includes(topic)) {
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

  const doc_text = formatDocs(relevant_ids, relevant_docs, relevant_metadatas)

  const chat_prompt = getChatPrompt(query, doc_text)

  // console.log(chat_prompt)
  // return 'yes'

  //check if atleast one entry contains the topic substring

  const good_query = relevant_ids.some((id) => {
    return id.toLowerCase().includes(topic.toLowerCase())
  })

  console.log('INFO: relevant ids contain topic? ', good_query)

  return 'unable to find message'
}

rl.setPrompt('USER > ')
rl.prompt()

rl.on('line', async (line) => {
  if (line === 'exit') {
    rl.close()
  } else {
    const response = await converse(line)
    console.log(`FASB > ${response}`)
    rl.prompt()
  }
}).on('close', () => {
  console.log('Goodbye!')
  process.exit(0)
})
