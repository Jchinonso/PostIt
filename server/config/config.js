const dotenv = require('dotenv').config();

module.exports = {
  development: {
    username: "postgres",
    password: "poly12345",
    database: "post-it",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  test: {
    use_env_variable: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
