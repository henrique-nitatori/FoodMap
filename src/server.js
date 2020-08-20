const express = require('express');

const server = express();
const consign = require('consign');
const knex = require('knex');
const knexFile = require('../knexfile');

server.db = knex(knexFile.development);

consign({ cwd: 'src' })
  .include('config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(server);

server.use((err, req, res, next) => {
  const { name, message } = err;
  if (name === 'ValidationError') {
    res.status(400).json({ error: message });
  } else { res.status(500).json({ name, message }); }
  next(err);
});
module.exports = server;
