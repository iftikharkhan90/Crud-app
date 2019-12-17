var mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/crud", { useCreateIndex: true, useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () { console.log('Successfully connected to DB') });