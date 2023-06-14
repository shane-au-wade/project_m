const ids = [
  [
    '840-30-30-4',
    '840-30-05-4',
    '840-30-05-1',
    '840-30-30-1',
    '840-30-05-3',
    '840-10-05-2',
    '840-30-35-9',
    '840-30-55-1',
    '840-30-50-1',
    '840-10-30-1',
  ],
  [
    '840-10-50-2',
    '842-10-05-2',
    '840-20-50-3',
    '842-20-05-1',
    '270-10-50-6A',
    '840-30-50-2',
    '840-10-50-4',
    '840-30-35-20',
    '840-20-50-2',
    '840-20-50-4',
  ],
  [
    '840-30-30-4',
    '840-30-30-1',
    '840-30-05-1',
    '606-10-55-407',
    '840-30-35-9',
    '840-10-30-1',
    '840-30-55-1',
    '840-10-25-37',
    '840-30-35-20',
    '840-30-25-1',
  ],
  [
    '840-30-30-4',
    '840-30-05-1',
    '840-10-25-37',
    '840-30-30-1',
    '840-30-35-17',
    '840-30-55-1',
    '840-30-35-20',
    '606-10-55-407',
    '840-30-50-1',
    '840-30-35-9',
  ],
]

const docs = [
  [
    '840-30-30-4 document',
    '840-30-05-4 document',
    '840-30-05-1 document',
    '840-30-30-1 document',
    '840-30-05-3 document',
    '840-10-05-2 document',
    '840-30-35-9 document',
    '840-30-55-1 document',
    '840-30-50-1 document',
    '840-10-30-1 document',
  ],
  [
    '840-10-50-2 document ',
    '842-10-05-2 document ',
    '840-20-50-3 document ',
    '842-20-05-1 document ',
    '270-10-50-6 document A',
    '840-30-50-2 document ',
    '840-10-50-4 document ',
    '840-30-35-2 document 0',
    '840-20-50-2 document ',
    '840-20-50-4 document ',
  ],
  [
    '840-30-30-4 docs',
    '840-30-30-1 docs',
    '840-30-05-1 docs',
    '606-10-55-4 docs07',
    '840-30-35-9 docs',
    '840-10-30-1 docs',
    '840-30-55-1 docs',
    '840-10-25-3 docs7',
    '840-30-35-2 docs0',
    '840-30-25-1 docs',
  ],
  [
    '840-30-30-4 documents',
    '840-30-05-1 documents',
    '840-10-25-3 documents7',
    '840-30-30-1 documents',
    '840-30-35-1 documents7',
    '840-30-55-1 documents',
    '840-30-35-2 documents0',
    '606-10-55-4 documents07',
    '840-30-50-1 documents',
    '840-30-35-9 documents',
  ],
]

const metadatas = [
  [
    { data: '840-30-30-4 document' },
    { data: '840-30-05-4 document' },
    { data: '840-30-05-1 document' },
    { data: '840-30-30-1 document' },
    { data: '840-30-05-3 document' },
    { data: '840-10-05-2 document' },
    { data: '840-30-35-9 document' },
    { data: '840-30-55-1 document' },
    { data: '840-30-50-1 document' },
    { data: '840-10-30-1 document' },
  ],
  [
    { data: '840-10-50-2 document' },
    { data: '842-10-05-2 document' },
    { data: '840-20-50-3 document' },
    { data: '842-20-05-1 document' },
    { data: '270-10-50-6A document' },
    { data: '840-30-50-2 document' },
    { data: '840-10-50-40 document' },
    { data: '840-30-35-20 document' },
    { data: '840-20-50-2 document' },
    { data: '840-20-50-4 document' },
  ],
  [
    { data: '840-30-30-4 docs' },
    { data: '840-30-30-1 docs' },
    { data: '840-30-05-1 docs' },
    { data: '606-10-55-407 docs' },
    { data: '840-30-35-9 docs' },
    { data: '840-10-30-1 docs' },
    { data: '840-30-55-1 docs' },
    { data: '840-10-25-37 docs' },
    { data: '840-30-35-20 docs' },
    { data: '840-30-25-1 docs' },
  ],
  [
    { data: '840-30-30-4 documents' },
    { data: '840-30-05-1 documents' },
    { data: '840-10-25-37 documents' },
    { data: '840-30-30-1 documents' },
    { data: '840-30-35-17 documents' },
    { data: '840-30-55-1 documents' },
    { data: '840-30-35-207 documents' },
    { data: '606-10-55-407 documents' },
    { data: '840-30-50-1 documents' },
    { data: '840-30-35-9 documents' },
  ],
]

// How should a capital lease be accounted for on the lessee's financial statements in
// accordance with ASC 842, the new lease standard?

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

// const [relevant_ids, relevant_docs, relevant_metadatas] = filterQueryResults(ids, docs, metadatas, 10)

// console.log(relevant_ids, relevant_docs, relevant_metadatas)


function findAscTopicNumber(str) {
  // The regex matches numbers separated by dashes, up to 4 segments (e.g. 606, 840-30, 707-10-10, 101-10-10-1)
  const match = str.match(/(\d+(-\d+){0,3})/);
  return match ? match[0] : null;
}

// console.log(findAscTopicNumber(''))


console.log(findAscTopicNumber("This is a test string with number 606-10-55-407 in it."));
// Outputs: "606-10-55-407"

console.log(findAscTopicNumber("Another test string with number 101-10-10-1 in it."));
// Outputs: "101-10-10-1"

console.log(findAscTopicNumber("Another test string with number 101-10 in it."));
// Outputs: "101-10"


console.log(findAscTopicNumber("Another test string with number 606 in it."));
// Outputs: "101-10"

console.log(findAscTopicNumber("Test string with no number in it."));
// Outputs: null