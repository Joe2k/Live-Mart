const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String },
  deliveryDetails: {
    name: { type: String },
    contact: { type: String },
  },
  cost: { type: Number },
  quantity: { type: Number },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
