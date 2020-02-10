const express = require('express')
const router = express.Router()
const ComicController = require('../controllers/ComicController')
const middleware = require('../middlewares/middleware')

router.get('/', middleware.verifyToken, ComicController.getListComic)
router.get('/:id', middleware.verifyToken, ComicController.detailComic)
router.put('/:id', middleware.verifyToken, ComicController.updateComic)

module.exports = router