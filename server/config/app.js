import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Routes from '../routes/index';

require('dotenv').config();

/* eslint-disable no-console */
const app = express();
const router = express.Router();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Routes(router);

// prefix /api for all routes
app.use('/api/v1', router);

app.get('*', (req, res) => res.status(200).sendFile(path.join(
  __dirname, '../../client', 'index.html')
));

module.exports = app;
