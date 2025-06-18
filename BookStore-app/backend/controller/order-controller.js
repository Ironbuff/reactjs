const express = require('express')
const User = require('../models/user')
const Order = require('../models/order')


const orderPlaced = async (req, res) => {
    try{
        
        const {id} = req.headers;

        const {order} = req.body;

        const createdOrders = []

        // to array through every order
        for (orderData of order){

            const newOrder = new Order({
                user:id,
                clothes:orderData._id
            })

            //save the order
            const OrderfromDB = await newOrder.save()

            //to add to order array of user
            await User.findByIdAndUpdate(id,{$push:{order:OrderfromDB._id}})
            // clearing data from cart
            await User.findByIdAndUpdate(id,{$pull:{cart:OrderfromDB._id}})
            //to see if data has been saved
            createdOrders.push(OrderfromDB)
        }

        
     
        return res.status(200).json({
            message:"Order placed Sucessfully",
            orders:createdOrders
        })
    }
    catch(err){
        return res.status(500).json({message:"Server Error"})
    }
}


const removeOrder = async (req, res) => {
    try {
      const { id } = req.headers; // User ID
      const { orderId } = req.params; // Order ID
  
      // Find the order and ensure it belongs to the user
      const order = await Order.findById(orderId);
      if (!order || order.user.toString() !== id) {
        return res.status(404).json({ message: "Order not found or not authorized" });
      }
  
      // Remove order reference from user
      await User.findByIdAndUpdate(id, {
        $pull: { orders: orderId }
      });
  
      // Delete order
      await Order.findByIdAndDelete(orderId);
  
      res.status(200).json({ message: "Order removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

//get order history
const getOrderhistory = async(req,res)=>{
    try{
        const{id}= req.headers;
    const userinfo = User.findById(id).populate({
        path:'orders',
        populate:{path:"book"},
    })
    const Orderdata = await userinfo.orders.reverse()
    return res.status(200).json({data:Orderdata})
}
catch(err){
    console.log(err)
    return res.status(500).json({message:"Server Error"})
}
}

//get all order
const getallOrders = async(req,res)=>{
    try{
        //get all order
        const getorder = await Order.find().populate({path:"user"}).populate({path:"book"}).sort({createdAt:-1})
        return res.status(200).json({data:getorder})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
}

//update status
const updatestatus = async(req,res)=>{
    try{
        
        const{id}= req.params;
        //to update order
        await Order.findByIdAndUpdate(id,{
            status:req.body.status
        })
        return res.status(200).json({message:"updated sucessfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
}





exports.orderPlaced = orderPlaced
exports.getOrderhistory = getOrderhistory
exports.getallOrders = getallOrders
exports.updatestatus = updatestatus
exports.removeOrder = removeOrder