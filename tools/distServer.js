import express from 'express';
import path from 'path';
import open from 'open';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import Routes from '../server/routes/index';

require('dotenv').config();
/* eslint-disable no-console */

const port = process.env.PORT || 5000;
const app = express();
const router = express.Router();


app.use(compression());
app.use(express.static('dist'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


Routes(router);

// prefix /api for all routes
app.use('/api/v1', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
