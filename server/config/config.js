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
    password,
    database,
    host,
    port,
    username: DB_USERNAME,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.env.URL,
    dialect: 'postgres'
  }
};

