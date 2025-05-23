const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    clothes:{
        type:mongoose.Types.ObjectId,
        ref:"Clothes"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    },
    status:{
        enum:["Order Placed","Delivered","Cancelled"],
        required:true,
        default:"Order Placed"
    }
})

module.exports = mongoose.model("Order",OrderSchema)