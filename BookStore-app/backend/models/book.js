const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    url:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    discount: {
        type: Number,
        default: 0, // discount in percentage
      }
},{timestamps:true})
module.exports = mongoose.model('Books',BookSchema)