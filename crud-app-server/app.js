const server = require('./src/server')

const PORT = process.env.PORT || 8000;

server.listen(PORT, function () {
    console.log("Express server listening on port " + PORT);
});
