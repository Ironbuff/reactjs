const orderController = require("../controller/order-controller");
const express = require("express");
const router = express.Router();
const { optionalAuth } = require("../middleware/optionalauth");

router.post("/orderplaced", optionalAuth, orderController.OrderPlaced);
router.get("/getOrder", optionalAuth, orderController.getOrderPlacedList);
router.put(
  "/orderStatus/:orderId",
  optionalAuth,
  orderController.getOrderPlacedList,
);
router.get(
  "/getOrder/admin",
  optionalAuth,
  orderController.getOrderPlacedAdminList,
);
module.exports = router;
