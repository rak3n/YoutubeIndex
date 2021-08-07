const dbConnection = require( '../database/db')
const itemSchema = require( '../schema')
const resultParser = require( './resultParser')
const googleapis = require('googleapis')


// A default string contant for ccking error from GOOGLE APIS 
const QUOTA_EXCEEDED_ERROR_MSG = 'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.'

const ItemModel = dbConnection.model('youtube', itemSchema) 

// For multiple Google API keys, please specify as a single string separated by ` | `
const authKeys = String(process.env.GOOGLE_API_KEY).split(' | ')

let gapi = new googleapis.youtube_v3.Youtube({
  auth: authKeys.shift() // Pop and take the first element in an array, when exhausted shift to next, and so on
})

// We always fetch results only after 2018-01-01 to avoid old results
const params = {
  part: ['snippet'],
  maxResults: 50,
  order: 'date',
  type: ['video'],
  publishedAfter: '2018-01-01T00:00:00Z',
  q: process.env.YT_SEARCH_QUERY
}

module.exports = () => {
    console.log('Refreshing videos data!')
    gapi.search.list(params).then(response => {
      var results = resultParser.parseApiResponse(JSON.parse(JSON.stringify(response.data)))
      // Dump data retrieved from Google API to MongoDB
      // First remove the entire DB and then refresh. 
      results=[{count:results.length , results}]    
      ItemModel.deleteMany((_err=>{
        if(_err){
          console.log("failed to remove")
        }else{
          ItemModel.insertMany(results, { ordered: false }).then(_response => {
            console.log('Refreshed successfully!')
          }).catch(err => {
            //first try insertion than update
            console.log(`Failed to refresh! Retrying in ${process.env.GOOGLE_API_REFRESH_INTERVAL}s. Error:\n${err}`)
        })
        }
      }))
      .catch(err => {
        //Catch the Quota Exceed error 
      if (err.message === QUOTA_EXCEEDED_ERROR_MSG && authKeys.length) {
        const newApiKey = authKeys.shift()
        gapi = new googleapis.youtube_v3.Youtube({
          auth: newApiKey // Replace old API key with the newer one
        })
        console.log(`Quota exceeded for current API key. Updating to new API key: ${newApiKey}`)
      } else {
        console.error(err)
      }
  })}
  )
}
