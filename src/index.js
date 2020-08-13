require('dotenv').config()
import express from 'express'
import http from 'http'
import initSocket from './socketio'
import apiRouter from './api'
import bodyParser from 'body-parser'
import './shared/mongoose'
import cors from 'cors'
const debug = require('debug')('express:server');

const app = express()
const httpServer = http.createServer(app)

initSocket(httpServer)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(apiRouter)

const port = process.env.SERVER_PORT | 4000
httpServer.listen(port, () => console.log('Server is listening on', port))
httpServer.on('error', onError);
httpServer.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
