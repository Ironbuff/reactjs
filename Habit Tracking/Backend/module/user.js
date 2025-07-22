const { timeStamp } = require('console')
const mongoose = require('mongoose')
const { type } = require('os')
const Schema  = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        minlength:3,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
          type:String,
          minlength:3,
    },

},{timestamps:true})

module.exports = mongoose.model("User",userSchema)
