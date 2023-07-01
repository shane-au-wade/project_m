// tpye fncm = Array<{
//     file_name: string,
//     chapter_map: Array<{
//         chapter_id: string
//         page_start: number
//         page_end: number
//     }>
// }>

const fs = require('fs')
const path = require('path')
const util = require('util')
const { OPENAI_API_KEY } = require('./config')

const { ChromaClient } = require('chromadb')

const client = new ChromaClient()
// const client = new ChromaClient({
//   path: 'http://ec2-35-161-235-3.us-west-2.compute.amazonaws.com:8000',
// })

const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

const pdfjsLib = require('pdfjs/build/pdf')

const file_name_chapter_map = [
  {
    file_name: 'auditing_standards_audits_after_december_15_2020.pdf',
    chapter_map: [],
  },
  {
    file_name: 'auditing_interpretations_audits_after_december_15_2020.pdf',
    chapter_map: [],
  },
]

const document_directory = './pcaob/documents'
const embedding_directory = './pcaob/embeddings'

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function getRandomInterval(min, max) {
  return Math.random() * (max - min) + min
}

async function main() {
  // computer the ids, metadatas, and documents
  // which will be loaded into chroma db
  const ids = []
  const metadatas = []
  const documents = []

  for (const doc of file_name_chapter_map) {
    const pdf_path = path.join(document_directory, doc.file_name)

    const pdf = await pdfjsLib.getDocument(pdf_path).promise

    console.log('PDF loaded')

    const metadata = await pdf.getMetadata()

    Object.keys(metadata).forEach((key) => {
      console.log(`${key}`)
      console.log(metadata[key])
    })

    const outline = await pdf.getOutline()

    const contents = outline.filter((section) => (section.title = 'Contents'))

    console.log('contents:', contents)

    let curr_data = contents.filter((section) => section.items.length > 0)

    curr_data = curr_data[0].items

    const chapters = curr_data[0].items

    console.log('chatpers: ', chapters)

    for (let i = 0; i < chapters.length - 1; ++i) {
      const chapter = chapters[i]
      const next_chapter = chapters[i + 1]

      const page_ref = chapter.dest[0]
      const next_page_ref = next_chapter.dest[0]

      const page_index = await pdf.getPageIndex(page_ref)
      const next_page_index = await pdf.getPageIndex(next_page_ref)

      console.log(`${chapter.title}\n start: ${page_index + 1},\n end: ${next_page_index}`) // Page numbers are 1-based, but indexes are 0-based.

      doc.chapter_map.push({
        title: chapter.title,
        id: chapter.title.split(':')[0],
        page_start: page_index,
        page_end: next_page_index - 1,
      })
    }

    //  process the last chapter
    const last_chapter = chapters[chapters.length - 1]
    const last_page_ref = last_chapter.dest[0]
    const last_page_index = await pdf.getPageIndex(last_page_ref)

    const final_page_index = pdf.numPages

    console.log(`INFO: ${last_chapter.title}\n start: ${last_page_index + 1},\n end: ${final_page_index}`) // Page numbers are 1-based, but indexes are 0-based.

    doc.chapter_map.push({
      title: last_chapter.title,
      id: last_chapter.title.split(':')[0],
      page_start: last_page_index,
      page_end: final_page_index,
    })

    // now the chapter maps are filled out

    for (const chapter of doc.chapter_map) {
      for (let i = chapter.page_start; i <= chapter.page_end; ++i) {
        const page = await pdf.getPage(i)

        const page_content = await page.getTextContent()

        const text = page_content.items.map((item) => item.str).join(' ')

        const id = `${chapter.id} ${i}`

        metadatas.push({
          id: id,
          chapter_id: chapter.id,
          chapter_title: chapter.title,
          page_number: i,
        })

        ids.push(id)

        documents.push(text)
      }
    }
  }

  // compute embedding for each document
  // use an embedding cache to store embeddings
  const embedding_cache_file_path = path.join(embedding_directory, 'embedding_cache.json')
  const data = await readFile(embedding_cache_file_path, 'utf-8')
  const save_file = JSON.parse(data)

  const embeddings = []

  console.log(save_file)

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

  //   cache the final embeddings
  fs.writeFileSync(embedding_cache_file_path, JSON.stringify(save_file, null, 0), 'utf-8', function (err) {
    if (err) console.log('Error writing file', err)
  })

  // load data into chroma db
  console.log(ids.length)
  console.log(embeddings.length)
  console.log(metadatas.length)
  console.log(documents.length)

  const collection_config = { name: 'pcaob' }

  const heartbeat = await client.heartbeat()

  console.log(heartbeat)

  await client.deleteCollection(collection_config)

  let collection = await client.createCollection(collection_config)

  const chunkIntoN = (arr, n) => {
    const size = Math.ceil(arr.length / n)
    return Array.from({ length: n }, (v, i) => arr.slice(i * size, i * size + size))
  }

  const docs_per_chunk = 2000
  const chunks = Math.ceil(documents.length / docs_per_chunk)
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

  const entries = await collection.peek({ limit: 2 })
  console.log(entries)

  console.log(await collection.count())
}

main()
