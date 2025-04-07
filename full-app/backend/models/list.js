const mongoose = require('mongoose');


//schema creation
const listSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type:String,
        required:true,
    },
     //since we only those user who is login to system to show them task they include
    user:{
            type:mongoose.Types.ObjectId, //this is done so that we can acess items from the list of specific user
            ref:'User', //it shows the model where we take reference and also it should be same as first argument int the mongoose.model content
        }
},
{ timestamps: true} //In Mongoose, the { timestamps: true } option automatically adds two fields to your schema:createdAt: The date and time when the document was created.

//updatedAt: The date and time when the document was last modified.
)

// model creation
module.exports = mongoose.model('List', listSchema) //this shows list will be shown in the database