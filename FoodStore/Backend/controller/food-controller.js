const express = require('express')
const Food = require('../models/food-modal');


exports.getFoodCollection = async (req, res) => {
  try {
    const foods = await Food.find({});

    return res.status(200).json({
      success: true,
      count: foods.length,
      foods
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};