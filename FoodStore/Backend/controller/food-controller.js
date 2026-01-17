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
