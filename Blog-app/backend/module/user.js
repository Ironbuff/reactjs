const mongoose = require('mongoose')
const Schema = mongoose.Schema


//defined user schema
const UserSchema = new Schema(
{
    username:{
    type:String,
    required:true,
    unique:true,
    min:3
},
    password:{
        type:String,
        required:true,
        unique:true,
        min:3
    },
})

module.exports= new mongoose.model('User',UserSchema)

