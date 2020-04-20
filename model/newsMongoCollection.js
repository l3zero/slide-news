const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
   newsId: String,
   articles: [{title: String, url: String, imageUrl: String}]
})

const NewsCollection = mongoose.model('newsdumps', NewsSchema)

module.exports = NewsCollection
