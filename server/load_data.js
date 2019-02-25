const fs = require('fs')
const path = require('path')
const http = require('http')
const esConnection = require('./connection')

/** Clear ES index, parse and index all files from the books directory */
async function bulkLoadNaicsData () {
    try {
      // Clear previous ES index
      await esConnection.resetIndex()

      const filePath = path.join('./naics', "es-bulkload-naics-2017.txt")
      const naicsBulkLoadPayload = fs.readFileSync(filePath, 'utf8')
      await esConnection.client.bulk({body: naicsBulkLoadPayload})

    } catch (err) {
      console.error(err)
    }
}
  
bulkLoadNaicsData();