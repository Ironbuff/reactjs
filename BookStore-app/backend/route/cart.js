const express = require('express')
const router = express.Router()
const {authenticateToken} = require('../controller/userAuth')
const cartcontroller = require('../controller/cart-controller')

router.put('/add-to-cart',authenticateToken,cartcontroller.addtoCart)
router.put('/remove-from-cart/:bookid',authenticateToken,cartcontroller.removeFromCart)
router.get('/get-cart-books',authenticateToken,cartcontroller.getcartbooks)





module.exports = router