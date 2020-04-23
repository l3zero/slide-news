const NewsCollection = require('../model/newsMongoCollection.js')

const uploadNews = (req, res, next) => {
   if (!req.params.newsId) {
      return res.status(400).json({
         success: false,
         error: 'You must provide a newsId!',
      })
   } else if (!req.body) {
      return res.status(400).json({
         success: false,
         error: 'You must provide data in your request body!',
      })
   } else {
      let fullBody = req.body
      fullBody.newsId = req.params.newsId
      NewsCollection.create(fullBody)
         .then((data) => res.json(data))
         .then(() => {
            return res.status(201).json({
               success: true,
               message: 'News object created!',
            })
         })
         .catch(next)
   }
}

const getNews = async (req, res) => {
   await NewsCollection.findOne({newsId: req.params.newsId}, (err, news) => {
      if (err) {
         return res.status(400).json({success: false, error: err})
      }

      if (!news) {
         return res.status(404).json({success: false, error: `News object not found`})
      }
      return res.status(200).json({success: true, data: news})
   }).catch((err) => console.log(err))
}

const updateNews = async (req, res) => {
   await NewsCollection.findOneAndUpdate({newsId: req.params.newsId}, {articles: req.body.articles}, (err, news) => {
      if (err) {
         return res.status(400).json({success: false, error: err})
      }
      if (!news) {
         return res.status(404).json({success: false, error: `News object not found`})
      }
      return res.status(200).json({success: true, dataUpdated: news})
   }).catch((err) => console.log(err))
}

const deleteNews = async (req, res) => {
   await NewsCollection.findOneAndDelete({newsId: req.params.newsId}, (err, news) => {
      if (err) {
         return res.status(400).json({success: false, error: err})
      }

      if (!news) {
         return res.status(404).json({success: false, error: `News object not found`})
      }

      return res.status(200).json({success: true, data: news})
   }).catch((err) => console.log(err))
}

module.exports = {
   uploadNews,
   getNews,
   deleteNews,
   updateNews,
}
