const express = require('express');

const server = express();

server.use(express.json());

const projectR = require('./data/helpers/projectRouter.js');
const actionR = require('./data/helpers/actionRouter.js');


server.use('/api/projects', projectR);
server.use('/api/actions', actionR);


server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Sprint:)</h>
      <p>... </p>
    `);
});

module.exports = server;
