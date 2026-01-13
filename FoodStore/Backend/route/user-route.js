const userController = require('../controller/user-controller')
const express = require('express');
const router = express.Router()


router.post('/sign',userController.sign)


module.exports = router