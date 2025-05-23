const multer = require('multer')
const fs = require('fs')
const uploadimg = multer({dest:'uploads/'})
const express = require('express')
const router = express.Router()
const {authenticatetoken} = require('../controller/userAuth')
const clothController = require('../controller/cloth-controller')



router.post('/addcloth',uploadimg.single('file'),authenticatetoken,clothController.addCloth)
router.put('/updatecloth',uploadimg.single('file'),authenticatetoken,clothController.update)
router.put('/removecloth',authenticatetoken,clothController.removecloth)
router.get('/getcloth',clothController.getclothes)
router.get('/getclothbyid/:id',clothController.getclothesbyid)
router.get('/getlatestcloth',clothController.getlatestcloth)


module.exports=router