const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  otp: {
    type: String,
  },
  type: {
    type: String,
  },
  sellingItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  boughtItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  sellingEvents: [
    {
      time: { type: String },
      buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    },
  ],
  buyingEvents: [
    {
      time: { type: String },
      seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    },
  ],
});

module.exports = User = mongoose.model("User", UserSchema);
