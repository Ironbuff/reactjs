const userController = require("../controller/user-controller");
const express = require("express");
const router = express.Router();
const optionalAuth = require("../middleware/optionalauth");

router.post("/sign", userController.sign);
router.post("/login", userController.login);
router.post("/role", optionalAuth, userController.setRole);

module.exports = router;
