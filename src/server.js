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


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
    //some other code
 
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
     res.sendFile(path.join(__dirname, 'crud-app', 'build', 'index.html'))

   })
}
server.get('/', function (req, res) {
    res.custom({ success: true, message: "Hello World!" });
})
// server.use('/', express.static(path.join(__dirname, '/crud-app/build')));


//Error Control
server.use(function (err, req, res, next) {

    console.error(err)
    res.status(500).send(err)

})

module.exports = server