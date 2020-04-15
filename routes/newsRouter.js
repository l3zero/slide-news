const express = require('express')

const NewsController = require('../controller/newsController.js')

const router = express.Router()

router.post('/upload', NewsController.uploadNews)
//router.put('/movie/:id', NewsController.updateMovie)
//router.delete('/movie/:id', NewsController.deleteMovie)
router.get('/id/:id', NewsController.getNews)
router.get('/all', NewsController.getAllNews)

module.exports = router
