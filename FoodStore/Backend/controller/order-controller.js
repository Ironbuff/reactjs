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
    const { userId } = req.headers;
    const user = User.findById(userId);
    const role = user.role;
    const IsUserAdmin = role === "admin";
    if (!IsUserAdmin) {
      return res
        .status(200)
        .json({ message: "User isnt allowed get Order List." });
    }
    const orderList = await Order.find();

    return res
      .status(200)
      .json({ message: "Order List Fetched Sucessfully", order: orderList });
  } catch (err) {
    return res.staus(500).json({ message: "Server Error", error: err });
  }
};
