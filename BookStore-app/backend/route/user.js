const express = require('express')
const router = express.Router()
const usercontroller= require('../controller/user-controller')
const {authenticateToken} = require('../controller/userAuth')

router.post('/register',usercontroller.userRegister)
//for login
router.post('/login',usercontroller.userLogin)
//for getting all users
router.get('/getuser',authenticateToken,usercontroller.getUsers)



module.exports = router