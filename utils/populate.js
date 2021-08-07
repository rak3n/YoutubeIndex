const refreshData = require("./refreshData")

module.exports = ()=>{
    // Set an Interval to Populate the DB
    setInterval(()=>{
        refreshData()
    }, process.env.GOOGLE_API_REFRESH_INTERVAL * 1000) //refresh after every  N seconds
}