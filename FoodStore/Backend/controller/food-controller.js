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

exports.getFoodCollectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    return res.status(200).json({
      success: true,
      food,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

exports.addFoodCollection = async (req, res) => {
  try {
    const { title, description, price, discount } = req.body;
    const userId = req.user?.id;

    const errors = {};

    if (!title || title.trim().length < 2) {
      errors.title = "Title must be at least 2 characters";
    }

    if (!description || description.trim().length < 2) {
      errors.description = "Description must be at least 2 characters";
    }

    const priceNumber = Number(price);
    if (!price || isNaN(priceNumber) || priceNumber <= 0) {
      errors.price = "Price must be a valid number greater than 0";
    }

    const discountNumber = discount ? Number(discount) : 0;
    if (discount && isNaN(discountNumber)) {
      errors.discount = "Discount must be a number";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const imagepath = req.file?.path || "public/dummy.jpg";

    const newFood = new Food({
      title,
      description,
      price: priceNumber,
      discount: discountNumber,
      image: imagepath,
      user: userId,
    });

    await newFood.save();

    return res.status(200).json({
      success: true,
      message: "Added Food successfully",
      data: newFood,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteFoodCollection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: Please login." });
    }

    const deletedFood = await Food.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deletedFood) {
      return res.status(404).json({
        message: "Food not found or you are not authorized to delete it.",
      });
    }

    return res
      .status(200)
      .json({ message: "Food Item deleted Successfully.", deletedId: id });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

exports.editFoodCollection = async (req, res) => {
  try {
    const { title, description, price, discount } = req.body;
    const userId = req.user.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! Please Login" });
    }

    const imagepath = req.file ? req.file.path : undefined;

    const updateFood = await Food.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        discount,
        ...(imagepath && { image: imagepath }),
      },
      { new: true },
    );

    if (!updateFood) {
      return res.status(404).json({ message: "Food Not Found" });
    }

    return res
      .status(200)
      .json({ message: "Food Updated Sucessfully", updatedFood: updateFood });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
