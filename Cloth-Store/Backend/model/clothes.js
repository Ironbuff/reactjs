const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClothesSchema = new Schema({
    img:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    seller:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        default:0,
    },
    category:{
        type:String,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model("Clothes",ClothesSchema)