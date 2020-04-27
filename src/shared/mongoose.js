import mongoose from 'mongoose'
const env = process.env

const connString = `mongodb://${env.MONGO_USER}:${env.MONGO_PWD}@mongo:27017/${env.MONGO_DB}`

mongoose.connect(connString, {
  useNewUrlParser: true
})
