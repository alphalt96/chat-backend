require('dotenv').config()
import express from 'express'
import http from 'http'
import initSocket from './socketio'
import apiRouter from './api'
import bodyParser from 'body-parser'
import './shared/mongoose'

const app = express()
const httpServer = http.createServer(app)

initSocket(httpServer)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(apiRouter)

const port = process.env.SERVER_PORT | 4000
httpServer.listen(port, () => console.log('Server is listening on', port))
