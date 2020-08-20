const express = require('express');

module.exports = (app) => {
  const rotaProtegida = express.Router();

  rotaProtegida.use('/usuario', app.routes.usuario);
  app.use('/v1', rotaProtegida);
};
