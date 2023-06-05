const readline = require('readline')
const { ChromaClient } = require('chromadb')
const { Configuration, OpenAIApi } = require('openai')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const configuration = new Configuration({
  apiKey: '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',
})

const openai = new OpenAIApi(configuration)
const client = new ChromaClient()

const collection_config = { name: 'fasb' }

const thread = []

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
${query}`
}

async function converse(query) {
  thread.push({
    role: 'user',
    content: query,
  })

  // embed query
  const response = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: query,
  })
  const query_embedding = response.data.data[0].embedding

  // find relevant documents
  const fasb_collection = await client.getCollection(collection_config)
  const result = await fasb_collection.query({
    queryEmbeddings: [query_embedding],
    nResults: 10,
    // where: { metadata_field: 'is_equal_to_this' },
  })

  console.log(result.ids)

  const doc_text = formatDocs(result.ids, result.documents, result.metadatas)

  const chat_prompt = getChatPrompt(query, doc_text)

  console.log(chat_prompt)

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are an expert financial statement auditor. 
        You will use the FASB Accounting Standards Codification to awnser questions and write memos.`,
      },
      {
        role: 'user',
        content: chat_prompt,
      },
    ],
  })

  const ai_response = completion.data.choices[0].message

  thread.push(ai_response)

  console.log(ai_response)

  return ai_response.content
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
