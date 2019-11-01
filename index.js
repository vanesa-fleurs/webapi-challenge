const server = require('./server.js');

const port = process.env.PORT || 8888;

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});