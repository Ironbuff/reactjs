const express = require("express");
const User = require("../models/user-modal");
const Food = require("../models/food-modal");
const Order = require("../models/user-modal");

exports.OrderPlaced = async (req, res) => {
  try {
    const { orderId } = req.headers;
    const { order } = req.body;

    const CreatedOrder = [];

    for (orderData of order) {
      const newOrder = new Order({
        user: orderId,
        food: orderData._id,
      });

      const orderDataFromDB = await newOrder.save();

      await User.findByIdAndUpdate(id, {
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
