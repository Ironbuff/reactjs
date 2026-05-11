const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  food: {
    type: mongoose.Types.ObjectId,
    ref: "Food",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["Order Placed", "Waiting", "Served"],
    default: "Order Placed",
  },
});

module.exports = mongoose.model("Order", orderSchema);
