const express = require('express')
const router = express.Router()
const authController = require('../controller/auth-controller')

router.post('/refresh',authController.refreshtoken)


module.exports = router