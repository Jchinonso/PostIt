require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    database: 'PostIt',
    username: 'postgres',
    password: 'poly12345',
    host: 'localhost',
    port: 5433
  },
  test: {
    use_env_variable: 'TEST_DB_URL',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
