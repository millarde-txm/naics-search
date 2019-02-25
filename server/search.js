const { client, index, type } = require('./connection')

module.exports = {
  /** Query ES index for the provided term */
  queryTerm (term, offset = 0) {
    const body = {
      from: offset,
      query: { 
          match: {
            description: {
                query: term,
                operator: 'and',
                fuzziness: 'auto'
            }
        } 
    },
      highlight: { fields: { description: {} } }
//      explain: true
    }

    return client.search( {
        "index": index,
        "type": type,
        "body": body
    });
  }
}
