const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
  },
  cost: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  location: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  type: {
    type: String,
  },
  url: {
    type: String,
  },
  category: {
    type: String,
  },
  soldBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  boughtBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// ItemSchema.pre("find", function (next) {
//   this.populate("soldBy");
//   //   this.populate("boughtBy");
//   next();
// });

module.exports = Item = mongoose.model("Item", ItemSchema);
