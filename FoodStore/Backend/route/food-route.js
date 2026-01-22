const FoodController = require("../controller/food-controller");
const express = require("express");
const router = express.Router();
const { optionalAuth } = require("../middleware/optionalauth");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
  "/add",
  optionalAuth,
  upload.single("image"),
  FoodController.addFoodCollection,
);

router.get("/", FoodController.getFoodCollection);

(router.put(
  "/update/:id",
  optionalAuth,
  upload.single("image"),
  FoodController.editFoodCollection,
),
  router.delete(
    "/delete/:id",
    optionalAuth,
    FoodController.deleteFoodCollection,
  ));

module.exports = router;
