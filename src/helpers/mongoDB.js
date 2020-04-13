import mongoose from 'mongoose'
// mongoose.set('bufferCommands', false)
// mongoose.set('autoCreate', false)
const userName = process.env.REACT_APP_MONGODB_USER
const pw = process.env.REACT_APP_MONGODB_PW
const url = `mongodb://${userName}:${pw}@127.0.0.1:27017/news`

export function setup() {
   const db = mongoose
      .connect(url, {useNewUrlParser: true, useUnifiedTopology: true, keepAliveInitialDelay: 30000})
      .catch((err) => console.error(err))

   db.once('open', (_) => {
      console.log('Database connected:', url)
   })

   db.on('error', (err) => {
      console.error('connection error:', err)
   })
   return db
}

export function closeDB(db) {
   db.close(() => {
      console.log('Closing the database connection...')
   })
   db.on('disconnected', () => {
      console.log('Mongoose DB closed')
   })
}
