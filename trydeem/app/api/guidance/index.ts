import { ChromaClient } from 'chromadb'
import { OPENAI_API_KEY, CHROMADB_URL } from '../config'

const client = new ChromaClient({
  path: CHROMADB_URL,
})

const collection_config = { name: 'fasb' }

function getVseoPrompt(query: string) {
  return `Act as a Vector Database Search Engineer Optimizer (VSEO).  VSEO or vector search engine optimization involves creating inputs for a vector db query such that you receive high quality results.  A high quality result is defined as receiving all relevant documents contained within the db that related to all of the aspects present in the initial string input. 

In summary, you will receive a text input and then create a collection of new string inputs that will be used in a vector database query.

---
INPUT:
What is the best method to grow organic tomatoes in an urban garden?

NEW QUERY STRINGS:
["Organic tomato cultivation methods",
"Growing tomatoes in urban settings",
"Best practices for urban gardening with tomatoes",
"Methodology for growing tomatoes in a city"]
---

INPUT:
${query}

NEW QUERY STRINGS:
`
}

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

function findAscTopicNumber(str: string) {
  // The regex matches numbers separated by dashes, up to 4 segments (e.g. 606, 840-30, 707-10-10, 101-10-10-1)
  const regex = /\b\d+(\-\d+)*\b/g
  const matchs = str.match(regex)

  const topics = [
    105, 205, 210, 215, 220, 225, 230, 235, 250, 255, 260, 270, 272, 274, 275, 280, 305, 310, 320, 321, 323, 325, 326,
    330, 340, 350, 360, 405, 410, 420, 430, 440, 450, 460, 470, 480, 505, 605, 606, 610, 705, 710, 712, 715, 718, 720,
    730, 740, 805, 808, 810, 815, 820, 825, 830, 832, 835, 840, 842, 845, 848, 850, 852, 853, 855, 860, 905, 908, 910,
    912, 915, 920, 922, 924, 926, 928, 930, 932, 940, 942, 944, 946, 948, 950, 952, 954, 958, 960, 962, 965, 970, 972,
    974, 976, 978, 980, 985, 995,
  ]

  function filter_topics(_matchs: Array<string>) {
    const final_topics = []

    for (const match of _matchs) {
      if (match.length == 3 && topics.includes(parseInt(match))) final_topics.push(match)

      const regex = /^(\d+)-/
      const main_topic = match.match(regex)
      if (main_topic && main_topic[1].length == 3 && topics.includes(parseInt(main_topic[1]))) final_topics.push(match)
    }

    return final_topics
  }

  return matchs ? filter_topics(matchs) : []
}

function formatDocs(ids, documents, metadatas) {
  const text = []
  for (const [index, doc] of documents.entries()) {
    text.push(`FASB ASC Topic ${doc}\n`)
  }
  return text.join('\n')
}

type Models =
  | 'gpt-3.5-turbo-16k-0613'
  | 'gpt-3.5-turbo-16k'
  | 'gpt-3.5-turbo-0613'
  | 'gpt-3.5-turbo'
  | 'gpt-4-0613'
  | 'gpt-4'

export async function findRelevantGuidance(query: string, model: Models) {
  console.log('INFO: finding relevant guidance, please wait...')

  console.log('INFO: using model ', model)

  // asc topic extraction
  const _topics = findAscTopicNumber(query)
  const topic = _topics ? _topics[0] : null

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

  let result
  let fasb_collection
  // find relevant documents
  try {
    fasb_collection = await client.getCollection(collection_config)

    result = await fasb_collection.query({
      queryEmbeddings: query_embeddings,
      nResults: 10,
    })
  } catch (error) {
    console.log(error)
  }

  if (!result) {
    console.log(result)
    return 'ERROR with chroma db'
  }

  console.log('INFO: chroma query results', result.ids)

  let [relevant_ids, relevant_docs, relevant_metadatas] = filterQueryResults(
    result.ids,
    result.documents,
    result.metadatas,
    9
  )

  if (topic && fasb_collection) {
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

  const guidance = {
    relevant_guidance: relevant_ids.map((id) => `FASB ASC ${id}`),
    relevant_guidance_text: docs_text,
  }

  return guidance
}
