const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
    username:{
        type:String,
        unique:true,
        minlength:3,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:3,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    food:[{
        type:mongoose.Types.ObjectId,
        ref:'Food'
    }],
    role:{
        enum:['cook','admin','waiter','user'],
        type:String,
        default:"user",
    }
},{timestamps:true})


module.exports = mongoose.model("User",userSchema)