const express = require('express')
const router = express.Router() //to import Router property from express the R should be capital for router
const UserController = require('../controller/user-controller')

//for register
router.post('/register',UserController.UserRegister)

//login
router.post('/login',UserController.Userlogin)

//for getting cookie
router.get('/profile',UserController.getCookie)

//for logout
router.post('/logout',UserController.logout)

module.exports=router;