const express = require('express')
const router = express.Router()
const cartController = require('../controller/cart-controller')
const { authenticatetoken } = require('../controller/userAuth')


router.post('/addcart',authenticatetoken,cartController.addtoCart)
router.put('/removecart',authenticatetoken,cartController.removefromCart)
router.get('/getcart',cartController.getcartcloth)



module.exports=router