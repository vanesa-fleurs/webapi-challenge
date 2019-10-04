const express = require('express');

const server = express();

server.use(express.json());

//middleware
const projectM = require('./data/helpers/projectModel.js');
const actionM = require('./data/helpers/actionModel.js');

server.use(express.json());

server.use('/api/projects', projectM);
server.use('/api/actions', actionM);


//endpoints
server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda WEP API III Challenge :)</h>
      <p>Sprint I: Node!</p>
    `);
});

module.exports = server;