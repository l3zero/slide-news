require('dotenv').config()
const express = require('express'),
   bodyParser = require('body-parser'),
   compression = require('compression'),
   helmet = require('helmet'),
   cors = require('cors'),
   path = require('path'),
   db = require('./db/mongoDB'),
   newsRouter = require('./routes/newsRouter')
const app = express()
app.disable('x-powered-by')
//DB Stuff
db.once('open', (_) => {
   console.log('Database connected')
})
db.on('error', (err) => {
   console.error('connection error: ', err)
})
db.on('disconnected', function () {
   console.log('Database disconnected')
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
// app.use(
//    helmet.contentSecurityPolicy({
//       directives: {
//          // defaultSrc: ["'self'"],
//          scriptSrc: ["'unsafe-hashes'", "'unsafe-inline'"],
//          fontSrc: ['https://fonts.googleapis.com/'],
//          styleSrc: ["'self'", 'https://fonts.googleapis.com/'],
//          formAction: ["'self'"],
//          frameAncestors: ["'self'"],
//          frameSrc: ["'self'"],
//       },
//    })
// )
app.use(compression())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Handle 404
// app.use(function (req, res) {
//    res.status(400)
//    res.json({title: '404: File Not Found', message: err.message, error: {}})
// })

// Handle 500
// app.use(function (err, req, res, next) {
//    res.status(500)
//    res.json({title: '500: Internal Server Error', message: err.message, error: {}})
// })
app.use('/mynews', newsRouter)

app.use(express.static(path.join(__dirname, 'client/build')))
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
//Dev
// const port = process.env.PORT || '9000'
// const server = app.listen(port, () => {
// console.log(`App running → PORT ${port}`)
// })
//Prod
const port = process.env.PORT || '9000'
app.listen(port)
