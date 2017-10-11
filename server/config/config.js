require('dotenv').config();

const {
  DB_USERNAME,
  password,
  database,
  host,
  port
} = process.env;

module.exports = {
  development: {
    password,
    database,
    host,
    port,
    username: DB_USERNAME,
    dialect: 'postgres'
  },
  test: {
    url: process.env.URL_TEST,
    dialect: 'postgres'
  },
  production: {
    url: process.env.URL,
    dialect: 'postgres'
  }
};

