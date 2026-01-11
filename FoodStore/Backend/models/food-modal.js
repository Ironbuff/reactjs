const mongoose = require('mongoose');
const schema = mongoose.Schema;

const foodSchema = new Schema({
    food:{
        type:String,
        required:true,
        minlength:2
    },
    image:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        required:false,
    }
})


module.exports = mongoose.model('Food',foodSchema)