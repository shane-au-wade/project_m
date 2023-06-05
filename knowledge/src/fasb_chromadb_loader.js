const fs = require('fs')
const path = require('path')
const util = require('util')

const { ChromaClient } = require('chromadb')

const client = new ChromaClient()

const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)

const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function getRandomInterval(min, max) {
  return Math.random() * (max - min) + min
}

let auto_id = 1

function findId(inputStr) {
  let pattern = /#(.*?)\n/
  let match = inputStr.match(pattern)

  // If match is found, return it
  if (match && match[1] !== '') return match[1].trim()

  // return custom glossary id
  const gid = `glossary-${auto_id}`
  auto_id += 1
  return gid
}

function findDefinitions(inputStr) {
  var regex = /---(.*?)---/s
  var match = inputStr.match(regex)
  return match ? match[1].trim() : ''
}

function findDocument(inputStr) {
  const doc = inputStr.substring(inputStr.lastIndexOf('---') + '---'.length, inputStr.length)
  return doc ? doc.trim() : ''
}

async function loadJsonFiles(document_directory, embedding_directory) {
  const ids = []
  const documents = []
  const metadatas = []

  const files = await readdir(document_directory)

  for (const file of files) {
    if (path.extname(file) !== '.json') continue
    const filePath = path.join(document_directory, file)

    const data = await readFile(filePath, 'utf-8')

    const _documents = JSON.parse(data)

    // for each document, get an id, final document and metadata object
    for (const [index, doc] of _documents.entries()) {
      const id = findId(doc)
      const definitions = findDefinitions(doc)
      const document = findDocument(doc)

      if (!document) console.log('failed to parse document!')

      const metadata = {
        fasb_code: id,
        definitions: definitions,
        full_document: doc,
      }

      // truncate document to XXXX characters
      const char_limit = 5000
      if (document.length > char_limit) {
        const trunc_document = document.slice(0, char_limit) + '...'
        documents.push(trunc_document)
      } else {
        documents.push(document)
      }

      ids.push(id)
      metadatas.push(metadata)
    }
  }

  const embedding_cache_file_path = path.join(embedding_directory, 'embedding_cache.json')
  const data = await readFile(embedding_cache_file_path, 'utf-8')

  // create embeddings for each document
  const embeddings = []
  const save_file = JSON.parse(data)

  for (const [index, doc] of documents.entries()) {
    const id = ids[index]

    console.log(`INFO: processing ${id}, ${index}/${documents.length - 1}`)

    if (save_file[id]) {
      console.log('embedding found in cache!')
      embeddings.push(save_file[id])
      continue
    }

    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: doc,
    })
    const embedding = response.data.data[0].embedding
    embeddings.push(embedding)

    save_file[id] = embedding

    // cache the embeddings ever 20th success
    if (index % 20 == 0) {
      fs.writeFileSync(embedding_cache_file_path, JSON.stringify(save_file, null, 0), 'utf-8', function (err) {
        if (err) console.log('Error writing file', err)
      })
    }

    await sleep(getRandomInterval(50, 450))
  }

  // cache the final embeddings
  fs.writeFileSync(embedding_cache_file_path, JSON.stringify(save_file, null, 0), 'utf-8', function (err) {
    if (err) console.log('Error writing file', err)
  })

  return { ids, embeddings, metadatas, documents }
}

// Call the function with the directory path
loadJsonFiles('./knowledge/fasb/documents', './knowledge/fasb/embeddings')
  .then(async ({ ids, embeddings, metadatas, documents }) => {
    console.log(ids.length)
    console.log(embeddings.length)
    console.log(metadatas.length)
    console.log(documents.length)

    const collection_config = { name: 'fasb' }

    await client.deleteCollection(collection_config)

    let collection = await client.createCollection(collection_config)

    const chunkIntoN = (arr, n) => {
      const size = Math.ceil(arr.length / n)
      return Array.from({ length: n }, (v, i) => arr.slice(i * size, i * size + size))
    }

    const docs_per_chunk = 2000
    const chunks = documents.length/docs_per_chunk
    const chunked_ids = chunkIntoN(ids, chunks)
    const chunked_embeddings = chunkIntoN(embeddings, chunks)
    const chunked_metadatas = chunkIntoN(metadatas, chunks)
    const chunked_documents = chunkIntoN(documents, chunks)

    for (const [index, docs_chunk] of chunked_documents.entries()) {
      console.log(`INFO: adding documents chunk ${index}/${chunked_documents.length - 1}`)

      const status = await collection.add({
        ids: chunked_ids[index],
        embeddings: chunked_embeddings[index],
        metadatas: chunked_metadatas[index],
        documents: docs_chunk,
      })

      if (!status) console.log(status)
    }

    const entries = await collection.peek({ limit: 5 })
    console.log(entries)

    console.log(await collection.count())
  })
  .catch((err) => {
    console.error(err)
  })
