const supertest = require('supertest');

const app = require('../../src/server');

const request = supertest('http://localhost:3000/v1/usuario');

let user;

beforeEach(async () => {
  const result = await app.services.usuario.criarUsuario({
    usuario: `Henrique${Date.now()}`,
    nome: 'Henrique',
    sobrenome: 'Nitatori',
    senha: 'nitatori',
    logradouro: 'Sao cristovao',
    numero: 25,
    email: `${Date.now()}@hotmail.com`,
    bairro: 'Naipi',
    estado: 'PR',
    pais: 'Brasil',
    telefone: 45934340343,
  });
  user = { ...result[0] };
});

test('Deve criar um novo usuario', () => {
  const emailTest = `${Date.now()}_criarNovoUsuario@hotmail.com`;
  const usuarioTest = `Henrique_criarNovoUsuario${Date.now()}`;
  request.post('/')
    .send({
      usuario: usuarioTest,
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      senha: 'nitatori',
      logradouro: 'Sao cristovao',
      numero: 25,
      email: emailTest,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.usuario).toBe(usuarioTest);
      expect(result.body.email).toBe(emailTest);
      expect(result.body.nome).toBe('Henrique');
      expect(result.body.sobrenome).toBe('Nitatori');
      expect(result.body).not.toHaveProperty('senha');
    });
});
test('Nao deve criar um novo usuario sem o email', () => {
  const usuarioTest = `Henrique_criarNovoUsuarioSemEmail${Date.now()}`;
  request.post('/')
    .send({
      usuario: usuarioTest,
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      senha: 'nitatori',
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Email é um atributo obrigatorio.');
    });
});
test('Nao deve criar um novo usuario sem o nome de usuario', () => {
  const emailTest = `${Date.now()}_criarNovoUsuarioSemUsuario@hotmail.com`;
  request.post('/')
    .send({
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      senha: 'nitatori',
      email: emailTest,
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Usuário é um atributo obrigatorio.');
    });
});
test('Nao deve criar um novo usuario sem senha', () => {
  const emailTest = `${Date.now()}_criarNovoUsuarioSemSenha@hotmail.com`;
  const usuarioTest = `Henrique_criarNovoUsuarioSemSenha${Date.now()}`;
  request.post('/')
    .send({
      usuario: usuarioTest,
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      email: emailTest,
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Senha é um atributo obrigatorio.');
    });
});
test('Nao deve criar um novo usuario sem nome', () => {
  const emailTest = `${Date.now()}_criarNovoUsuarioSemNome@hotmail.com`;
  const usuarioTest = `Henrique_criarNovoUsuarioSemNome${Date.now()}`;
  request.post('/')
    .send({
      usuario: usuarioTest,
      sobrenome: 'Nitatori',
      email: emailTest,
      senha: 'nitatori',
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Nome é um atributo obrigatorio.');
    });
});
test('Nao deve criar um novo usuario sem sobrenome', () => {
  const emailTest = `${Date.now()}_criarNovoUsuarioSemSobrenome@hotmail.com`;
  const usuarioTest = `Henrique_criarNovoUsuarioSemSobrenome${Date.now()}`;
  request.post('/')
    .send({
      usuario: usuarioTest,
      nome: 'Henrique',
      email: emailTest,
      senha: 'nitatori',
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Sobrenome é um atributo obrigatorio.');
    });
});
test('Nao deve criar um novo usuario com nome de usuario repetido', () => {
  const emailTest = `${Date.now()}_criarNovoUsuarioRepetido@hotmail.com`;
  request.post('/')
    .send({
      usuario: user.usuario,
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      email: emailTest,
      senha: 'nitatori',
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Usuário já cadastrado.');
    });
});
test('Nao deve criar um novo usuario com email repetido', () => {
  const usuarioTest = `Henrique_criarNovoUsuarioUsuarioRepetido${Date.now()}`;
  request.post('/')
    .send({
      usuario: usuarioTest,
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      email: user.email,
      senha: 'nitatori',
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Email já cadastrado.');
    });
});

test('Deve alterar o campo nome de um usuario ja existente', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Joao',
      sobrenome: 'Nitatori',
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    }).then((result) => {
      expect(result.status).toBe(200);
      expect(result.body[0].nome).toBe('Joao');
    });
});
test('Deve alterar o campo sobrenome de um usuario ja existente', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Henrique',
      sobrenome: 'dos santos',
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    }).then((result) => {
      expect(result.status).toBe(200);
      expect(result.body[0].sobrenome).toBe('dos santos');
    });
});
test('Deve alterar o campo logradouro de um usuario ja existente', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      logradouro: 'Inacio Alves',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    }).then((result) => {
      expect(result.status).toBe(200);
      expect(result.body[0].logradouro).toBe('Inacio Alves');
    });
});
test('Deve alterar o campo numero de um usuario ja existente', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      logradouro: 'Sao cristovao',
      numero: 30,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    }).then((result) => {
      expect(result.status).toBe(200);
      expect(result.body[0].numero).toBe(30);
    });
});
test('Deve alterar o campo bairro de um usuario ja existente', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      logradouro: 'Sao cristovao',
      numero: 30,
      bairro: 'Jardim Sao Paulo',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    }).then((result) => {
      expect(result.status).toBe(200);
      expect(result.body[0].bairro).toBe('Jardim Sao Paulo');
    });
});
test('Deve alterar o campo estado de um usuario ja existente', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      logradouro: 'Sao cristovao',
      numero: 30,
      bairro: 'Jardim Sao Paulo',
      estado: 'SP',
      pais: 'Brasil',
      telefone: 45934340343,
    }).then((result) => {
      expect(result.status).toBe(200);
      expect(result.body[0].estado).toBe('SP');
    });
});
test('Deve alterar o campo pais de um usuario ja existente', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      logradouro: 'Sao cristovao',
      numero: 30,
      bairro: 'Jardim Sao Paulo',
      estado: 'SP',
      pais: 'Paraguay',
      telefone: 45934340343,
    }).then((result) => {
      expect(result.status).toBe(200);
      expect(result.body[0].pais).toBe('Paraguay');
    });
});
test('Deve alterar o campo telefone de um usuario ja existente', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      logradouro: 'Sao cristovao',
      numero: 30,
      bairro: 'Jardim Sao Paulo',
      estado: 'SP',
      pais: 'Paraguay',
      telefone: 45934340000,
    }).then((result) => {
      expect(result.status).toBe(200);
      expect(result.body[0].telefone).toBe('45934340000');
    });
});
test('Nao deve alterar o usuario sem o campo nome', () => {
  request.put(`/${user.id}`)
    .send({
      sobrenome: 'Nitatori',
      logradouro: 'Sao cristovao',
      numero: 30,
      bairro: 'Jardim Sao Paulo',
      estado: 'SP',
      pais: 'Paraguay',
      telefone: 45934340000,
    }).then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Nome é um atributo obrigatorio.');
    });
});
test('Nao deve alterar o usuario sem o campo sobrenome', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Henrique',
      logradouro: 'Sao cristovao',
      numero: 30,
      bairro: 'Jardim Sao Paulo',
      estado: 'SP',
      pais: 'Paraguay',
      telefone: 45934340000,
    }).then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Sobrenome é um atributo obrigatorio.');
    });
});
test('Nao deve alterar o usuario com o campo email no objeto', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      email: user.email,
      logradouro: 'Sao cristovao',
      numero: 30,
      bairro: 'Jardim Sao Paulo',
      estado: 'SP',
      pais: 'Paraguay',
      telefone: 45934340000,
    }).then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('O atributo email não pode ser alterado por essa rota.');
    });
});
test('Nao deve alterar o usuario com o campo usuario no objeto', () => {
  request.put(`/${user.id}`)
    .send({
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      usuario: user.usuario,
      logradouro: 'Sao cristovao',
      numero: 30,
      bairro: 'Jardim Sao Paulo',
      estado: 'SP',
      pais: 'Paraguay',
      telefone: 45934340000,
    }).then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('O atributo usuário não pode ser alterado por essa rota.');
    });
});
