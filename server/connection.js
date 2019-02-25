const elasticsearch = require('elasticsearch')

// Core ES variables for this project
const index = 'naics_index'
const type = 'naics'
const port = 9200
const host = process.env.ES_HOST || 'localhost'
const client = new elasticsearch.Client({ host: { host, port } })

/** Check the ES connection status */
async function checkConnection () {
  let isConnected = false
  while (!isConnected) {
    console.log('Connecting to ES')
    try {
      const health = await client.cluster.health({})
      console.log(health)
      isConnected = true
      return health
    } catch (err) {
      console.log('Connection Failed, Retrying...', err)
    }
  }
}

/** Clear the index, recreate it, and add mappings */
async function resetIndex () {
    if (await client.indices.exists({ index })) {
      await client.indices.delete({ index })
    }
  
    const indexStatus = await client.indices.create({ index })
    console.log(indexStatus)
}

module.exports = {
    client, index, type, checkConnection, resetIndex
}
