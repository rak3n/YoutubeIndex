const mongoose = require('mongoose')

// DB configuration and setup file
const dbURL = `mongodb://${String(process.env.MONGO_HOSTNAME)}:${String(process.env.MONGO_DBPASSWORD)}@cluster0-shard-00-00.qtnrv.mongodb.net:27017,cluster0-shard-00-01.qtnrv.mongodb.net:27017,cluster0-shard-00-02.qtnrv.mongodb.net:27017/${String(process.env.MONGO_DBNAME)}?ssl=true&replicaSet=atlas-l3tpxr-shard-0&authSource=admin&retryWrites=true&w=majority`
console.log("mongo connection" + dbURL)
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

// Initate a connection with URL and options
const dbConnection = mongoose.createConnection(dbURL, dbOptions)

dbConnection.on('connected', () => {
  console.log('Connected to MongoDB successfully.')
})

dbConnection.on('error', error => {
  console.log(`MongoDB connection couldn't be established. ${JSON.stringify(error)}`)
})

//export the module.
module.exports=dbConnection
