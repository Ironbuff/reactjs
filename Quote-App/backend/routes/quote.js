const express = require('express')
const router = express.Router()
//adding jasonwebtoken
const jwt = require('jsonwebtoken')
const quotecontroller = require('../controller/quote-controller')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//for adding Quote
router.post('/addquote',upload.single('file'),quotecontroller.createpost)
//for getting all quote
router.get('/getquote',quotecontroller.getQuote)
//for getting specific quote by id
router.get('/getquote/:id',quotecontroller.getquoteByQuotetId)
//for updating specific quote
router.post('/updatequote',upload.single('file'),quotecontroller.Updatequote)
// for delete route:
router.delete('/delete/:id',quotecontroller.deleteQuote);

module.exports = router