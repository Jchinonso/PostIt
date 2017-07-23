// This will be our application entry. We'll setup our server here.
import open from 'open';
import app from './server/config/app';

require('dotenv').config();

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
