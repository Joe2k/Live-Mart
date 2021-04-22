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
});

UserSchema.pre(/^find/, function (next) {
  this.populate("sellingItems");
  this.populate("boughtItems");
  next();
});

module.exports = User = mongoose.model("User", UserSchema);
