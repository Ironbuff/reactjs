const express = require('express')
const User = require('../model/user')
const Clothes = require('../model/clothes')
const Order = require('../model/order')
const clothes = require('../model/clothes')


const OrderPlaced = async(req,res)=>{
    try{
        
        const {id} = req.header;

        const {order} = req.body;

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
            return res.status(200).json({message:"Order placed Sucessfully"})
        }
    }
    catch(err){
        return res.status(500).json({message:"Server Error"})
    }
}

const RemoveOrder = async(req,res)=>{
    try{

        const {id} = req.headers

        const {ordersId} = req.params

        const order = await Order.findById(ordersId)

        if(!order || order.user.toString()!=id){
            return res.status(400).json({message:"There is no Order or User isn't authorized"})
        }
        
        //to remove the order of user
        await User.findByIdAndUpdate(id,{
            $pull:{order:ordersId}
        })

        //delete order from order db
        Order.findByIdAndDelete(ordersId)     
    }
    catch(err){
        return res.status(500).json({message:"Server Error"})
    }
}

const getOrderhistory = async(req,res)=>{

    try{
        const {id} = req.header

    //show order history so it shows order from latest order
    const userInfo = await User.findById(id).populate({
        path:'order',
        populate:{path:'clothes'}
    }
    )
    
    const OrderData = await userInfo.order.reverse()

    return res.status(200).json({data:OrderData})
    
    }
    catch(err){
        return res.status(500).json({message:"Server Error"})
    }
}

const getAllOrder = async(req,res)=>{
    try{
        // get all order
    const AllOrder = await Order.find().populate({path:'user'}).populate({path:'clothes'}).sort({createdAt:-1})

    return res.status(200).json({data:AllOrder})
    }
    catch{
        return res.status(500).json({message:"Server Error"})
    }
}

const UpdateStatus = async(req,res)=>{
    try{
         const {orderid} = req.params
         const {id}= req.header

         await Order.findByIdAndUpdate(orderid,{status:req.body.status})

         const OrderStatus = await Order.findById(orderid)
         const Userinfo = await User.findById(id)

         if(OrderStatus.status==="Delivered"){
            
            for(let clothid of OrderStatus.clothes){
                const cloth = await clothes.findById(clothid)
                if(cloth && cloth.quantity>=0){
                    cloth.quantity-=1
                    await cloth.save()
                }    
            }
         }
         
         return res.status(200).json({message:"Status Updated Sucessfully"})
    }
    catch(err){
        return res.status(500).json({message:"Server Error"})
    }
}

exports.OrderPlaced = OrderPlaced
exports.RemoveOrder= RemoveOrder
exports.getOrderhistory = getOrderhistory
exports.getAllOrder = getAllOrder
exports.UpdateStatus = UpdateStatus