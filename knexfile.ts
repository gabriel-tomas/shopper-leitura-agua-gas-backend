import path from "path";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: 'mysql2',
  connection: {
    host: 'db',
    database: 'db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, './database/migrations')
  }
};