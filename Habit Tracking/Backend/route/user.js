const express = require('express')
const router = express.Router()
const userController = require('../controller/user-controller')


router.post("/sign",userController.sign)
router.post("/login",userController.login)
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);




module.exports= router