const express = require('express')
const router = express.Router()
const {authenticateToken}= require('../controller/userAuth')
const ordercontroller = require('../controller/order-controller')


router.post('/place-order',authenticateToken,ordercontroller.orderPlaced)
router.get('/get-order/:id',ordercontroller.getOrderhistory,authenticateToken)
router.get('/get-all-order',ordercontroller.getallOrders,authenticateToken)
router.put('/update-order-status/:id',authenticateToken,ordercontroller.updatestatus)
router.delete('/remove-order/:orderId',authenticateToken,ordercontroller.removeOrder)

module.exports = router