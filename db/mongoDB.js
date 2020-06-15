const mongoose = require('mongoose')
//mongoose.set('autoIndex', false)
// mongoose.set('bufferCommands', false)
// mongoose.set('autoCreate', false)
const userName = process.env['MONGODB_USER']
const pw = process.env['MONGODB_PW']
const url = `mongodb://${userName}:${pw}@127.0.0.1:27017/news`

mongoose
   .connect(url, {useNewUrlParser: true, useUnifiedTopology: true, keepAliveInitialDelay: 30000})
   .catch((err) => console.error(err))

const db = mongoose.connection

module.exports = db
