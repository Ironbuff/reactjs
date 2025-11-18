const mongoose = require('mongoose')
const { type } = require('os')
const Schema = mongoose.Schema


const HabitSchema = new Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
    },
    description:{
        type:String,
        minlength:3
    },
    completedDates:[{
         type:Date
    }],
    image:{
        type:String,
        default:'uploads/nature.jpg'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})


module.exports = mongoose.model("Habit",HabitSchema)

