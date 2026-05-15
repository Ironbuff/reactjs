const orderController = require("../controller/order-controller");
const express = require("express");
const router = express.Router();
const { optionalAuth } = require("../middleware/optionalauth");

router.post("/orderplaced/:order", optionalAuth, orderController.OrderPlaced);

module.exports = router;
