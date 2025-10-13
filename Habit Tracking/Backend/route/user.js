const express = require('express')
const router = express.Router()
const userController = require('../controller/user-controller')


router.post("/sign",userController.sign)
router.post("/login",userController.login)
router.post("/verify-email", userController.verifyEmail);
router.post("/confirm-code", userController.confirmCode);




module.exports= router