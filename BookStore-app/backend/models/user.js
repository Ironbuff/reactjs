const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
      
    },
    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    favourites:[{
        type:mongoose.Types.ObjectId,
        ref:"Books"
    }],
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:"Books"
    }],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:"Order"
    }],

},{timestamp:true})

module.exports = mongoose.model('User',UserSchema)