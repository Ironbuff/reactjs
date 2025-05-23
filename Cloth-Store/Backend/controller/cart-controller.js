const User = require('../model/user')
const Clothes = require('../model/clothes')
const express = require('express')


// add the cloth to cart
const addtoCart = async (req, res) => {
    try {
        const { clothid, id } = req.header;

        const user = await User.findById(id)

        const cart = user.cart.includes(clothid)

        if (cart) {
            return res.status(200).json({ message: "Clothes is already in Cart" })
        }

        await User.findByIdAndUpdate(id, { $push: { cart: clothid } })


    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" })
    }
}

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
        const { id } = req.header
        const Userinfo = await User.findById(id).populate('cart')

        return res.status(200).json(Userinfo)

    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" })
    }
}


exports.addtoCart = addtoCart
exports.removefromCart =removefromCart
exports.getcartcloth = getcartcloth