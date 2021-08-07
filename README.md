# FamPay Youtube Indexer Assingment:
I have completed the assignment with the following features included:
* Continual background fetch for video query refresh in db.
* A GET API which returns the stored video data in a paginated response sorted in descending order of published datetime.
* Search API to search the stored videos using title and description.
* Support for controlling environment variables using '.env' file.
* Support for Multiple Google API Keys in case one gets unusable.
* Dockerized the project.

# Start The Server:
- Simply run <code>npm start</code> to initiate the server, <code>localhost:8080</code> renders a html on server up.
<br></br>
# API Endpoints:
* /get: 
    #### requests:
    - with GET on/get/:page, for getting the page with :page number from the collection.
    - with GET on /get/:page/:countInPage, for setting number of items in a page setted by countInPage, and page to get page number to get.
    - with POST on /get, with page and countInPage wrapped as JSON objects in request.

    #### resposne:
        {
            message: 'MESSAGE from SERVER',
            results: <ARRAY> (Array of video information, like videoId, title, channelId etc.)
            count: <INT> amount of results available in db, (can be used for calculating pagination ending, at client) 
        }

* /search: 
    #### requests:
    - with POST on /search, with searchString as String wrapped as JSON objects in request. by default return 20 default search responses.

    #### resposne:
        {
            message: 'MESSAGE from SERVER',
            results: <ARRAY> (Array of videos with searching over title and description.)
            count: <INT> amount of results available in db, (can be used for calculating pagination ending, at client) 
        }
<br></br>
# Tech Stack:
* NodeJs
* Express
* MongoDB
<br></br>
# .env Files
an env file consists of following structure:
```
GOOGLE_API_KEY='API_KEY1 | API_KEY2'
GOOGLE_API_REFRESH_INTERVAL='REFRESH_AMOUNT_IN_INT_AS_SECONDS'

HOST='localhost'
PORT='8080'

MONGO_HOSTNAME='MONGODB_HOST_NAME'
MONGO_DBNAME='MONGO_DB_DBNAME'
MONGO_DBPASSWORD='MONGODB_PASSWORD'

NODE_ENV='dev' OR 'prod'

YT_SEARCH_QUERY='football official'(SEARCH_QUERRY_TO MAKE)
```
<br></br>
# Database Setup:
- I used remote Mongo DB from MongoDb Inc. to get the project done fast, with setup followed inside there docs itself, then put the Credentials from the remote inside .env file, to initiate the process. For first run, it would take ```GOOGLE_API_REFRESH_INTERVAL``` amount of time to popultae the db initially.
<br></br>
# Future Scope:
- Although I have tried to keep the calls to db as minimal as possible making it a optimized and scalable, but can even be even be boosted for performance by using a caching like DB locally to cache results instead for making calls to mongo instance all the time for similar responses if data hasn't change after previous refresh.

