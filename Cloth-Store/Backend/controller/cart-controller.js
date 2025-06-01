const User = require('../model/user')
const Clothes = require('../model/clothes')
const express = require('express')


// add the cloth to cart
const addtoCart = async (req, res) => {
  try {
    const { clothid, userid } = req.headers;

    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isAlreadyInCart = user.cart.includes(clothid);

    if (isAlreadyInCart) {
      return res.status(200).json({ message: "Clothes is already in Cart" });
    }

    await User.findByIdAndUpdate(userid, { $push: { cart: clothid } });

    return res.status(200).json({ message: "Added to cart" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error", error: err });
  }
};

// remove from cart
const removefromCart = async (req, res) => {

    const { id, clothid } = req.header
    const Userinfo = await User.findById(id)

    const isInCart = Userinfo.cart.includes(clothid)

    if (isInCart) {
        return res.status(400).json({ message: "Item not in the Cart" })
    }

    await Userinfo.findByIdAndUpdate(id, { $pull: { cart: clothid } })
}

//get all cloth from cart
const getcartcloth = async (req, res) => {
  try {
    const { id } = req.headers;

    const Userinfo = await User.findById(id).populate('cart');

    if (!Userinfo) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ cart: Userinfo.cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error", error: err });
  }
};



exports.addtoCart = addtoCart
exports.removefromCart =removefromCart
exports.getcartcloth = getcartcloth