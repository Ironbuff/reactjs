const express = require("express");
const User = require("../models/user-modal");
const Food = require("../models/food-modal");
const Order = require("../models/order-modal");

exports.OrderPlaced = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { order } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const CreatedOrder = [];
    const orders = Array.isArray(order) ? order : [order];

    for (const foodId of orders) {
      const existingOrder = await Order.findOne({
        user: userId,
        food: foodId,
      });

      if (existingOrder) {
        continue;
      }

      const foodExists = await Food.findById(foodId);

      if (!foodExists) {
        continue;
      }

      const newOrder = new Order({
        user: userId,
        food: foodId,
      });

      const orderDataFromDB = await newOrder.save();

      await User.findByIdAndUpdate(userId, {
        $push: { order: orderDataFromDB._id },
      });

      CreatedOrder.push(orderDataFromDB);
    }

    return res.status(200).json({
      message: "Order Placed Successfully",
      orders: CreatedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
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
