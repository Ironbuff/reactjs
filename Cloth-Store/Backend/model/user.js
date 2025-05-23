const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        unique:true,
        required:true,
    },
    role:{
        enum:["user","admin"],
        type:String,
        default:"user"
    },
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:"Clothes"
    }],
    order:[{
        type:mongoose.Types.ObjectId,
        ref:"Order"
    }]
},{timestamps:true})

module.exports = mongoose.model("User", UserSchema)