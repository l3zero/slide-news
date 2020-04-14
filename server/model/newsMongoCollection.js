const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsCollection = new Schema({
   id: String,
   created: Date,
   expiration: Date,
   articles: [{title: String, url: String, imageUrl: String}]
})

module.exports = mongoose.model('newsDump', NewsCollection)
