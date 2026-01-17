const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    title:{
        type:String,
        required:true,
        minlength:2,
    },
    description:{
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
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})


module.exports = mongoose.model('Food',foodSchema)