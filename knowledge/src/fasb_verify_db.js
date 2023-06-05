const { ChromaClient, OpenAIEmbeddingFunction } = require('chromadb')

const client = new ChromaClient()

async function verifyChroma() {

const collection = await client.getCollection({name: 'fasb'})


const entries = await collection.peek({limit: 5})

console.log(entries)

console.log(await collection.count())

}


verifyChroma()



