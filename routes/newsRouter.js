const express = require('express')

const NewsController = require('../controller/newsController.js')

const router = express.Router()

router.post('/upload/:newsId', NewsController.uploadNews)
router.get('/id/:newsId', NewsController.getNews)
router.delete('/delete/:newsId', NewsController.deleteNews)
router.patch('/update/:newsId', NewsController.updateNews)

module.exports = router
