const supertest = require('supertest');

const email = `${Date.now()}@hotmail.com`;
const usuario = `Henrique${Date.now()}`;
const request = supertest('http://localhost:3000/v1/usuario');

test('Deve criar um novo usuario', () => {
  request.post('/')
    .send({
      usuario,
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      senha: 'nitatori',
      logradouro: 'Sao cristovao',
      numero: 25,
      email,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.usuario).toBe(usuario);
      expect(result.body.email).toBe(email);
      expect(result.body.nome).toBe('Henrique');
      expect(result.body.sobrenome).toBe('Nitatori');
      expect(result.body).not.toHaveProperty('senha');
    });
});
test('Nao deve criar um novo usuario sem o email', () => {
  request.post('/')
    .send({
      usuario,
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
  request.post('/')
    .send({
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      senha: 'nitatori',
      email,
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
  request.post('/')
    .send({
      usuario,
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      email,
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
  request.post('/')
    .send({
      usuario,
      sobrenome: 'Nitatori',
      email,
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
  request.post('/')
    .send({
      usuario,
      nome: 'Henrique',
      email,
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
  request.post('/')
    .send({
      usuario: 'drager',
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      email: `${email}1`,
      senha: 'nitatori',
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then(() => {
      request.post('/')
        .send({
          usuario: 'drager',
          nome: 'Henrique',
          sobrenome: 'Nitatori',
          email: `${email}2`,
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
});
test('Nao deve criar um novo usuario com email repetido', () => {
  request.post('/')
    .send({
      usuario: `${usuario}1`,
      nome: 'Henrique',
      sobrenome: 'Nitatori',
      email: `${email}1`,
      senha: 'nitatori',
      logradouro: 'Sao cristovao',
      numero: 25,
      bairro: 'Naipi',
      estado: 'PR',
      pais: 'Brasil',
      telefone: 45934340343,
    })
    .then(() => {
      request.post('/')
        .send({
          usuario: `${usuario}2`,
          nome: 'Henrique',
          sobrenome: 'Nitatori',
          email: `${email}1`,
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
});
