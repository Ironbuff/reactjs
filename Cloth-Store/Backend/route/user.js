const express = require('express')
const router = express.Router()
const UserController = require('../controller/user-controller')
const {authenticatetoken} = require('../controller/userAuth')

router.post('/register',UserController.registerUser)
router.post('/login',UserController.login)
router.get('/getuser',authenticatetoken,UserController.getUser)


module.exports = router