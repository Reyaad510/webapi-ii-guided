
const express = require('express');

const HubsRouter = require('./hubs/hubs-router.js')

const server = express();

// Below is piece of middleware parses req.body
server.use(express.json());
//Below since using '/api/hubs' make sure in hubs-router they dont use it instead just a '/'
server.use('/api/hubs', HubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});





module.exports = server;
