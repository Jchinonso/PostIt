

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Routes from '../routes/index';

require('dotenv').config();

const app = express();
const router = express.Router();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Routes(router);

// prefix /api for all routes
app.use('/api', router);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;