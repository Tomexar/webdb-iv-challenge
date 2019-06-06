const express = require('express');
const helmet = require('helmet');

const recipesRouter = require('../recipes/dishes-router')

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/recipes', recipesRouter);


server.get('/', (req, res) => {
  res.status(200).json({ hello: 'World!' });
});

module.exports = server;