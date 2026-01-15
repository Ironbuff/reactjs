const userController = require('../controller/user-controller')
const express = require('express');
const router = express.Router()


router.post('/sign',userController.sign)
router.post('/login',userController.login)


module.exports = router