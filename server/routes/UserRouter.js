const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/login', UserController.doLogin)
router.post('/register', UserController.doRegister)

module.exports = router