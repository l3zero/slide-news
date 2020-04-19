const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsCollection = new Schema({
   newsId: String,
   created: String,
   expires: String,
   articles: [{title: String, url: String, imageUrl: String}]
})

module.exports = mongoose.model('newsdumps', NewsCollection)
