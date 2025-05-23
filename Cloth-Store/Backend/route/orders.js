const express = require('express')
const router = express.Router()
const OrderController = require('../controller/order-controller')
const { authenticatetoken } = require('../controller/userAuth')

router.post('/order-place',authenticatetoken,OrderController.OrderPlaced)
router.put('/remove-order/:ordersId',authenticatetoken,OrderController.RemoveOrder)
router.get('/get-order-history',authenticatetoken,OrderController.getOrderhistory)
router.get('/get-all-order',authenticatetoken,OrderController.getAllOrder)
router.get('/update-status/:orderid',authenticatetoken,OrderController.UpdateStatus)


module.exports=router