const express = require('express');

module.exports = (app) => {
  const router = express.Router();
  router.post('/', async (req, res, next) => {
    try {
      const novoUsuario = await app.services.usuario.criarUsuario(req.body);
      return res.status(201).json(novoUsuario[0]);
    } catch (error) {
      return next(error);
    }
  });
  router.put('/:id', async (req, res, next) => {
    try {
      const usuarioAlterado = await app.services.usuario.alterarUsuario(
        { ...req.body, id: req.params.id },
      );
      return res.status(200).json(usuarioAlterado);
    } catch (error) {
      return next(error);
    }
  });
  return router;
};
