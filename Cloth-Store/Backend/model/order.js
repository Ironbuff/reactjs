const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    clothes:{
        type:mongoose.Types.ObjectId,
        ref:"Clothes"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["Order Placed","Delivered","Cancelled"],
        default:"Order Placed"
    }
})

module.exports = mongoose.model("Order",OrderSchema)