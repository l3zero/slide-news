const express = require('express')

const NewsController = require('../controller/newsController.js')

const router = express.Router()

router.post('/upload', NewsController.uploadNews)
router.get('/id/:id', NewsController.getNews)
//router.get('/all', NewsController.getAllNews)

module.exports = router
