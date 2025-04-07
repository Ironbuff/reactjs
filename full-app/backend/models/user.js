const mongoose = require('mongoose');


//schema creation in this we define what type of data is needed and shown to user
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
  username:{
        type:String, //since we want to create username with different ui so we keep it not required
    },
    password:{
        type:String,
        required:true,
    },
});

// model creation
module.exports = mongoose.model('User', userSchema) //this shows list will be shown in the database