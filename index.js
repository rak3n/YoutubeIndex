require('dotenv').config()

if(!process.env.NODE_ENV){
    console.log('NO ENV SETUP FOUND!! Read README.md file')
}
else{
if(process.env.NODE_ENV==="prod"){
    console.log = (...res) => {
        //DISABLES CONSOLE.LOG IN PRODUCTION
    }
}

const express = require('express')
const getRes = require('./routes/getPage')
const path = require('path')
const searchRes = require('./routes/searchResults')
const populate = require('./utils/populate')
const bodyParser = require('body-parser')
var app = express()

//for json data
app.use(bodyParser.json())

app.get('/',(req, res)=>{
    console.log('Home page')
    res.status(200).sendFile(path.resolve(__dirname, './public/index.html'))
})

//methods for post request alone
app.route('/get/:page').get(getRes.getPage)
app.route('/get/:page/:countInPage').get(getRes.getPage)
app.route('/get').post(getRes.getPage)


app.route('/search').post(searchRes.getSearch)

app.listen(process.env.PORT,()=>{
    console.log('app running')
});

// Call Function to Populate DB and refresh it.
populate()
}