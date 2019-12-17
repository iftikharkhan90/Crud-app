var mongoose = require('mongoose')

mongoose.connect("mongodb://iffi rana:iffi12345@ds123400.mlab.com:23400/crud", {  useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () { console.log('Successfully connected to DB') });