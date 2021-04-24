const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Item = require("../models/Item");

router.post("/offline", async (req, res) => {
  const { userId, itemId, date } = req.body;
  // console.log(userId, itemId, date);
  const buyer = await User.findById(userId);
  const item = await Item.findById(itemId);
  const seller = await User.findById(item.soldBy);
  // console.log(buyer);

  buyer.buyingEvents.push({ time: date, seller: seller.id, item: item.id });
  seller.sellingEvents.push({ time: date, buyer: buyer.id, item: item.id });
  await buyer.save();
  await seller.save();
  console.log(buyer);
  console.log(seller);
  return res.json({ msg: "Success" });
});

module.exports = router;
