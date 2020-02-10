const express = require('express')
const router = express.Router()
const UserRouter = require('./UserRouter')
const ComicRouter = require('./ComicRouter')

router.use('/', UserRouter)
router.use('/comics', ComicRouter)

module.exports = router