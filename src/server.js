var path = require('path');
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

//Import Middlewares
var customResponse = require('./middlewares/custom-response')

//Import Routes
var crudRouter = require('./routes/routes-crud')

//Configure Server
var server = express()

//DB Connection
require('./config/db-config')

// Cors for local development
var corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
server.use(cors(corsOptions))


//Body Parser
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

//Sending static files for root



// server.use('/', express.static(path.resolve(__dirname, '../build')))

//Use Custom Middleware to get custom response template in all api routes
server.use(customResponse)

//Setting Routes
server.use('/api/crud', crudRouter)
  
if (process.env.NODE_ENV === 'production'){
    //Sending static files for root
server.use(express.static('crud-app/build'));

   server.get('*', (req, res)=>{
     res.sendFile(path.resolve(__dirname, 'crud-app', 'build', 'index.html'))

   })
}
server.get('/', function (req, res) {
    res.custom({ success: true, message: "Hello World!" });
})


//Error Control
server.use(function (err, req, res, next) {

    console.error(err)
    res.status(500).send('Something broke!')

})

module.exports = server