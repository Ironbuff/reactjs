const express = require('express')
const router = express.Router()
//adding jasonwebtoken
const jwt = require('jsonwebtoken')
const quotecontroller = require('../controller/quote-controller')


//for adding Quote
router.post('/addquote',quotecontroller.createpost)
//for getting all quote
router.get('/getquote',quotecontroller.getQuote)
//for getting specific quote by id
router.get('/getquote/:id',quotecontroller.getquoteByQuotetId)
//for updating specific quote
router.post('/updatequote',quotecontroller.Updatequote)
// for delete route:
router.delete('/delete/:id',quotecontroller.deleteQuote);

module.exports = router