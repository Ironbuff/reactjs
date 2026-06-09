const express = require("express");
const User = require("../models/user-modal");
const Food = require("../models/food-modal");
const Order = require("../models/order-modal");

exports.OrderPlaced = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { order } = req.body;

    console.log(order);

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

      console.log(newOrder);

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
    console.log(err);
    return res.status(500).json({ message: "Server Error", Error: err });
  }
};

exports.getOrderPlacedList = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized. Please log in.",
      });
    }

    const order = await Order.find();

    console.log(userId, order);

    //  Pass { user: userId } into find() to isolate only this user's records
    const orderList = await Order.find({ user: userId })
      .populate("user")
      .populate("food");

    return res.status(200).json({
      message: "Your orders fetched successfully",
      orders: orderList,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
