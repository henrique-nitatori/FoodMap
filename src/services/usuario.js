const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const buscarUm = (filter = {}) => {
    return app.db('usuario').where(filter).first();
  };

  const getPasswordEncrypt = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const criarUsuario = async (usuario) => {
    if (!usuario.email) { throw new ValidationError('Email é um atributo obrigatorio.'); }
    if (!usuario.usuario) { throw new ValidationError('Usuário é um atributo obrigatorio.'); }
    if (!usuario.senha) { throw new ValidationError('Senha é um atributo obrigatorio.'); }
    if (!usuario.nome) { throw new ValidationError('Nome é um atributo obrigatorio.'); }
    if (!usuario.sobrenome) { throw new ValidationError('Sobrenome é um atributo obrigatorio.'); }

    const usuarioEncontradoPorEmail = await buscarUm({ email: usuario.email });
    if (usuarioEncontradoPorEmail) { throw new ValidationError('Email já cadastrado.'); }

    const usuarioEncontradoPorNomeUsuario = await buscarUm({ usuario: usuario.usuario });
    if (usuarioEncontradoPorNomeUsuario) { throw new ValidationError('Usuário já cadastrado.'); }

    const novoUsuario = { ...usuario };
    novoUsuario.senha = getPasswordEncrypt(usuario.senha);
    return app.db('usuario').insert(novoUsuario, ['id', 'usuario', 'email', 'nome', 'sobrenome']);
  };

  return { buscarUm, criarUsuario };
};
