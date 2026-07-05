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

    const orderList = await Order.find({
      user: userId,
    })
      .populate("user")
      .populate("food");

    const validOrders = orderList.filter((order) => order.food);

    return res.status(200).json({
      message: "Your orders fetched successfully",
      orders: validOrders,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.getOrderPlacedAdminList = async (req, res) => {
  try {
    const orderList = await Order.find({
      user: { $exists: true, $ne: null },
      food: { $exists: true, $ne: null },
    })
      .populate("user", "username email role")
      .populate("food");
    const userId = req?.user?.id;

    const selectedUser = await User.findById(userId);
    if (!selectedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isRoleAdmin = selectedUser.role === "admin";

    if (!isRoleAdmin) {
      return res.status(401).json({ message: "User isn't authorized" });
    }

    return res.status(200).json({ order: orderList });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

exports.changeOrderStatus = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { orderId } = req.params;
    const { status } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const selectedUser = await User.findById(userId);

    if (!selectedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (selectedUser.role !== "admin") {
      return res.status(403).json({
        message: "User isn't authorized",
      });
    }

    const allowedStatus = ["Order Placed", "Waiting", "Served"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    )
      .populate("user", "username email role")
      .populate("food");

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
