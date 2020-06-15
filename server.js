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
const gracefulExit = () => {
   db.close(() => {
      console.log('Database is disconnecting through app termination')
      process.exit(0)
   })
}
//Process stuff
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)
process.on('unhandledRejection', (reason, p) => {
   throw reason
})
process.on('uncaughtException', (error, origin) => {
   // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
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
app.use(
   helmet.contentSecurityPolicy({
      directives: {
         defaultSrc: ["'self'"],
         styleSrc: ["'self'"],
         scriptSrc: ["'self'"],
         fontSrc: ["'self'", "'https://fonts.googleapis.com'"],
         formAction: ["'self'"],
         frameAncestors: ["'self'"],
         frameSrc: ["'self'"],
         imgSrc: ["'*'"],
      },
   })
)
app.use(compression())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// Handle 404
app.use(function (req, res) {
   res.status(400)
   res.render('404', {title: '404: File Not Found'})
})

// Handle 500
app.use(function (err, req, res, next) {
   res.status(500)
   res.render('500', {title: '500: Internal Server Error', message: err.message, error: {}})
})
// app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', '*')
//    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//    next()
// })
// app.use((err, req, res, next) => {
//    console.log(err)
//    next()
// })
//app.use(express.static(path.join(__dirname, '../build')))
app.use('/mynews', newsRouter)

/*app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, '../build', 'index.html'))
})*/

const port = process.env.PORT || '9000'
const server = app.listen(port, () => {
   console.log(`App running → PORT ${port}`)
})
