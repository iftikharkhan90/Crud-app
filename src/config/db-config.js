var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/crud", { useCreateIndex: true, useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () { console.log('Successfully connected to DB') });