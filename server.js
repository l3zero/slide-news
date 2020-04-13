require('dotenv').config()
const express = require('express')
const path = require('path')
// import {setup} from './db/mongoDB'
const db = require('./db/mongoDB')
const app = express()

app.use(express.static(path.join(__dirname, 'build')))

db.once('open', (_) => {
   console.log('Database connected')
})

db.on('error', (err) => {
   console.error('connection error:', err)
})

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || '9000'
const server = app.listen(port, () => {
   console.log(`App running → PORT ${port}`)
})
