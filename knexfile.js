// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'foodmap',
      user: 'postgres',
      password: 'bancodedados',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'foodmap',
      user: 'postgres',
      password: 'bancodedados',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'foodmap',
      user: 'postgres',
      password: 'bancodedados',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
  },

};
