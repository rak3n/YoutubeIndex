const dbConnection = require('../database/db')
const itemSchema = require('../schema')
const ItemModel = dbConnection.model('youtube', itemSchema)

//having a default page offset of 20 results per results
var OFFSET=20

module.exports = {
  /**
   * Handles getting of all the data, paginated at 25 results per page
   * @param  req
   * @param  res
   */
  getPage: (req, res) => {
    // Validate if the user-input is an integer
    let page = 0
    let skipValue = 0

    // Page numbers start from 1, but offset starts from 0 for Mongo.
    const reqPage = req.params.page || req.body.page
    OFFSET = parseInt(req.params.countInPage || req.body.countInPage || OFFSET)
    if (reqPage !== undefined) {
      if (isNaN(reqPage)) {
        return res.status(500).json({ error: 'Request Not a Number' })
      }
      page = reqPage - 1
      skipValue = page * OFFSET
    }

    console.log([skipValue, skipValue + OFFSET])
    ItemModel.aggregate([
      {$project:{
        "results":{$slice: ['$results',skipValue, OFFSET]}
      }},
    ]).then(result => {
        result.results = result[0].results.sort((a,b)=>(Date(b.publish_time) - Date(a.publish_time)))
        res.status(200).json({ message: 'Data fetched successfully!', result:result[0] })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
  }
}