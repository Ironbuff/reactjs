import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
});

const Quote = mongoose.modelNames('Quote', QuoteSchema);
export default Quote