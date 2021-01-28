require('dotenv').config()
const express = require('express'),
   bodyParser = require('body-parser'),
   compression = require('compression'),
   rateLimit = require('express-rate-limit'),
   helmet = require('helmet'),
   cors = require('cors'),
   path = require('path'),
   db = require('./db/mongoDB'),
   newsRouter = require('./routes/newsRouter')
const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)
//DB Stuff
db.once('open', (_) => {
   // console.log('Database connected')
})
db.on('error', (err) => {
   console.error('connection error: ', err)
})
db.on('disconnected', function () {
   // console.log('Database disconnected')
})
//Process stuff
process.on('unhandledRejection', (reason, p) => {
   throw reason
})
process.on('uncaughtException', (error, origin) => {
   console.error(error)
   process.exitCode = 1
})
//Express stuff
const corsOptions = {
   allowedHeaders: 'Access-Control-Allow-Headers,Origin, X-Requested-With, Content-Type, Accept',
   origin: '*',
}
app.use(helmet())
app.use(helmet.referrerPolicy({policy: 'same-origin'}))
app.use(compression())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const apiLimiter = rateLimit({
   windowMs: 10 * 60 * 1000, // 10 minutes
   max: 100,
   message: 'The server has received more than 100 requests in 10 minutes, chill out for a few :)',
})
app.use('/mynews', newsRouter, apiLimiter)

app.use(express.static(path.join(__dirname, 'build')))
app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || '9000'
app.listen(port)
