const mongoose = require('mongoose')
//mongoose.set('autoIndex', false)
// mongoose.set('bufferCommands', false)
// mongoose.set('autoCreate', false)
// const userName = process.env['MONGODB_USER'] for dev only
// const pw = process.env['MONGODB_PW'] for dev only
// const url = `mongodb://${userName}:${pw}@127.0.0.1:27017/news` for dev only
const url = process.env['MONGODB_URI'] || 'mongodb://localhost/slide-news'

mongoose
   .connect(url, {useNewUrlParser: true, useUnifiedTopology: true, keepAliveInitialDelay: 30000})
   .catch((err) => console.error(err))

const db = mongoose.connection

module.exports = db
