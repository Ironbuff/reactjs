const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:'Books'
    },
    
    status:{
        type:String,
        default:"Order Placed",
        enum:["Order Placed","Delivered,Canceled"]
    }
},{timestamps:true})
module.exports = mongoose.model('Order',OrderSchema)