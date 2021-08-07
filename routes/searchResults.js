const dbConnection = require('../database/db')
const itemSchema = require('../schema')
const ItemModel = dbConnection.model('youtube', itemSchema)

const SEARCH_OFFSET = 20

module.exports = {
  /**
   * Handles the search functionality. Creates a regexp out of the search string and matches
   * with the database entries.
   * @param  req
   * @param  res
   */
  getSearch: (req, res) => {
    const searchString = req.params.searchString || req.body.searchString

    if (searchString === undefined || searchString === null) {
        res.status(200).json({ error: 'The specific search string was invalid!' })
        return;
    }
        // Convert search_string received into a regex for title & description matching
        const searchStringRegexp = new RegExp(searchString.replace(' ', '|'))
        //simply replace all spaces with 'or'
        ItemModel.aggregate([
          {$match: {$or: [{ 'results.title': { $regex: searchStringRegexp, $options: 'i' } },
            { 'results.description': { $regex: searchStringRegexp, $options: 'i' } }]
        }},
        // {$sort:{'results.publish_time':-1}},
        // {$limit:SEARCH_OFFSET},
        ]).sort({ publish_time: -1 }).limit(SEARCH_OFFSET).then(result => {
            console.log(result.length)
          res.status(200).json({ message: 'Data fetched successfully!', result:result[0] })
        }).catch(err => {
            console.log(err);
          res.status(500).json({ error: err })
        })
  }
}