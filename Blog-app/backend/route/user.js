const express = require('express')
const router = express.Router()
const usercontroller = require("../controller/user-controller")
const multer = require('multer')
const uploadimg = multer({dest:'uploads/'})

const post = require('../module/post')
const HttpError = require('../module/Error')
const secret = "adsdasfsfgsa"
const jwt= require('jsonwebtoken')
const postcontroller = require("../controller/post-controller")


router.post('/register', usercontroller.register)
router.post('/login',usercontroller.login)
router.get('/profile',usercontroller.getCookie)
router.post('/logout',usercontroller.logout)


/* --------- POST CREATION ROUTE --------- */
router.post('/createpost', uploadimg.single('file'),postcontroller.createpost)

  //to get value from database
  router.get('/post',postcontroller.getpost)
  

  //get value from database based on post id
  router.get('/post/:id',postcontroller.getPostByPostId)

//to update the post the api
router.put('/updatepost',uploadimg.single('file'),postcontroller.updatepost)

router.delete('/deletepost/:id',postcontroller.deletepost)


  module.exports = router //to import router property