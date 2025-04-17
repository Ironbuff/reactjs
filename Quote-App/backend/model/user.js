const mongoose= require('mongoose') //mongoose is used to define user database schema
const Schema = mongoose.Schema

//create user schema
const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:4
    },
    password:{
        type:String,
        required:true,
        unique:true,
        min:4
    }
})

module.exports = new mongoose.model('User',UserSchema) //here UserSchema is the actual used and User is ref used in defining relation