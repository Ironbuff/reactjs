const express = require("express");
const Food = require("../models/food-modal");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.getFoodCollection = async (req, res) => {
  try {
    const foods = await Food.find({});

    return res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.addFoodCollection = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    const { price, discount } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title & Description is Required" });
    }
    const priceNumber = Number(price);
    const discountNumber = discount ? Number(discount) : 0;

    if (isNaN(priceNumber) || priceNumber <= 0) {
      return res.status(400).json({ message: "Invalid price" });
    }

    const imagepath = req.file ? req.file.path : undefined;

    const newFood = new Food({
      title,
      description,
      price,
      discount: discountNumber,
      ...(imagepath && { image: imagepath }),
      user: userId,
    });

    await newFood.save();

    return res
      .status(200)
      .json({ message: "Added Food to menu Sucessfully", Foods: newFood });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

exports.deleteFoodCollection = async (req, res) => {
  try {
    // 1. Use params for RESTful ID (DELETE /food/:id)
    const { id } = req.params;

    // 2. Validate ID existence
    if (!id) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    // 3. Ensure User is Authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: Please login." });
    }

    // 4. Perform Delete with Ownership Check
    // We search by _id AND user id to ensure users can only delete their own items.
    const deletedFood = await Food.findOneAndDelete({ _id: id, user: req.user.id });

    // 5. Handle "Not Found" (Item doesn't exist OR belongs to another user)
    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found or you are not authorized to delete it." });
    }

    return res.status(200).json({ message: "Food Item deleted Successfully.", deletedId: id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
