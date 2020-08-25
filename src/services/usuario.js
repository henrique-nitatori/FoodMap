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

  const usuarioValidator = async (usuario) => {
    if (!usuario.email) { throw new ValidationError('Email é um atributo obrigatorio.'); }
    if (!usuario.usuario) { throw new ValidationError('Usuário é um atributo obrigatorio.'); }
    if (!usuario.senha) { throw new ValidationError('Senha é um atributo obrigatorio.'); }
    if (!usuario.nome) { throw new ValidationError('Nome é um atributo obrigatorio.'); }
    if (!usuario.sobrenome) { throw new ValidationError('Sobrenome é um atributo obrigatorio.'); }

    const usuarioEncontradoPorEmail = await buscarUm({ email: usuario.email });
    if (usuarioEncontradoPorEmail) { throw new ValidationError('Email já cadastrado.'); }

    const usuarioEncontradoPorNomeUsuario = await buscarUm({ usuario: usuario.usuario });
    if (usuarioEncontradoPorNomeUsuario) { throw new ValidationError('Usuário já cadastrado.'); }
  };

  const criarUsuario = async (usuario) => {
    await usuarioValidator(usuario);
    const novoUsuario = { ...usuario };
    novoUsuario.senha = getPasswordEncrypt(usuario.senha);
    return app.db('usuario').insert(novoUsuario, ['id', 'usuario', 'email', 'nome', 'sobrenome']);
  };

  const alterarUsuario = async (usuario) => {
    if (!usuario.nome) { throw new ValidationError('Nome é um atributo obrigatorio.'); }
    if (!usuario.sobrenome) { throw new ValidationError('Sobrenome é um atributo obrigatorio.'); }
    if (usuario.usuario != null) { throw new ValidationError('O atributo usuário não pode ser alterado por essa rota.'); }
    if (usuario.email != null) { throw new ValidationError('O atributo email não pode ser alterado por essa rota.'); }
    return app.db('usuario').where({ id: usuario.id })
      .update({
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        logradouro: usuario.logradouro,
        bairro: usuario.bairro,
        numero: usuario.numero,
        estado: usuario.estado,
        pais: usuario.pais,
        telefone: usuario.telefone,
      },
      ['id', 'logradouro', 'nome', 'sobrenome', 'bairro', 'numero', 'estado', 'pais', 'telefone']);
  };

  return { buscarUm, criarUsuario, alterarUsuario };
};
