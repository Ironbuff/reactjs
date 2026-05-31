const express = require("express");
const User = require("../models/user-modal");
const Food = require("../models/food-modal");
const Order = require("../models/order-modal");

exports.OrderPlaced = async (req, res) => {
  try {
    const { userId } = req.headers;
    const { order } = req.body;

    const CreatedOrder = [];

    for (orderData of order) {
      const existingOrder = await Order.findOne({
        user: userId,
        food: orderData._id,
      });

      if (existingOrder) {
        return res.status(400).json({ message: "Order Already Placed" });
      }

      const newOrder = new Order({
        user: userId,
        food: orderData._id,
      });

      const orderDataFromDB = await newOrder.save();

      await User.findByIdAndUpdate(userId, {
        $push: { order: orderDataFromDB._id },
      });

      CreatedOrder.push(orderDataFromDB);
    }

    return res
      .status(200)
      .json({ message: "Order Placed Sucessfully", order: CreatedOrder });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", Error: err });
  }
};

exports.getOrderPlacedList = async (req, res) => {
  try {
    const userId = req.user?.id;

    // Find user
    const user = await User.findById(userId);

    console.log("user found", userId);
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check admin role
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "User is not allowed to get order list",
      });
    }

    // Get orders with populated data
    const orderList = await Order.find().populate("user").populate("food");

    return res.status(200).json({
      message: "Order List Fetched Successfully",
      order: orderList,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
