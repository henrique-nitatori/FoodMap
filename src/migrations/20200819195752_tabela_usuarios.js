exports.up = (knex) => {
  return knex.schema.createTable('usuario', (t) => {
    t.increments('id').primary();
    t.string('usuario').notNull().unique();
    t.string('email').notNull().unique();
    t.string('senha').notNull();
    t.string('nome').notNull();
    t.string('sobrenome').notNull();
    t.string('logradouro').notNull();
    t.string('bairro').notNull();
    t.integer('numero').notNull();
    t.string('estado', [2]).notNull();
    t.string('pais').notNull();
    t.string('telefone').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('usuario');
};
