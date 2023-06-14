// const bool = [
//     '946-10-55-46',
//     'glossary-3179',
//     '915-10-15-1',
//     '985-20-60-2',
//     '860-20-55-49'
//   ].some((id) => {

//     console.log(id.toLowerCase().includes('606-10-05-3'.toLowerCase()))
//     return id.toLowerCase().indexOf('606-10-05-3'.toLowerCase())
//   })

//   console.log(bool)


const { ChromaClient } = require('chromadb')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})

const collection_config = { name: 'fasb' }

const client = new ChromaClient()


const fasb_collection = await client.getCollection(collection_config)


const topic_results = await fasb_collection.get({
  limit: 10,
  whereDocument: { $contains: topic },
})