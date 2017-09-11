// This will be our application entry. We'll setup our server here.
import open from 'open';
import SocketIo from 'socket.io';
import app from './server/config/app';
import socketEvents from './socketEvents';


require('dotenv').config();

const port = process.env.PORT || 5000;
const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
