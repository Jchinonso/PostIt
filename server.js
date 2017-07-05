// This will be our application entry. We'll setup our server here.

import app from './server/config/app'

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App running at http://localhost:${port}`);
  }
});