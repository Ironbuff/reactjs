const express = require('express')
const router = express.Router()
const bookcontroller = require('../controller/book-controller')
const {authenticateToken}= require('../controller/userAuth')

router.post('/addbook',authenticateToken,bookcontroller.addbook)
router.put('/updatebook',authenticateToken,bookcontroller.updatebook)
router.delete('/deletebook',authenticateToken,bookcontroller.deletebook)
router.get('/getbooks',bookcontroller.getbooks)
router.get('/getlatestbooks',bookcontroller.getlatestbooks)
router.get('/getbookbyid/:id',bookcontroller.getbookbyid)
router.get('/getfilteredbooks', bookcontroller.getfilteredbooks);


module.exports = router