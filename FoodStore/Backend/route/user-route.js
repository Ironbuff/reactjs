const UserController = require('../controller/user-controller')
const express = require('express');
const router = express.Router()


router.post('/user/sign',UserController.sign)


module.exports = router