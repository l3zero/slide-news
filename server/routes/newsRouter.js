const express = require('express')

const NewsController = require('../controller/newsController.js')

const router = express.Router()

router.post('/newsUpload', NewsController.uploadNews)
//router.put('/movie/:id', NewsController.updateMovie)
//router.delete('/movie/:id', NewsController.deleteMovie)
router.get('/myNews/:id', NewsController.getNews)
router.get('/myNews', NewsController.getAllNews)

module.exports = router
