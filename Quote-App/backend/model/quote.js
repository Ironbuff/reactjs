const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create Quote model
const QuoteSchema = new Schema({
    //new is use to create object and this is used to assign value to object
    title:{
        type:String,
        required:true,
        unique:true,
    },
    quote:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
        unique:true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
},{
    
    timestamps: true, // Returns values such as createdAt and updatedAt
})

//exporting model
module.exports= new mongoose.model('Quote',QuoteSchema)