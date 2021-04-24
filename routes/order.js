const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Item = require("../models/Item");
const Order = require("../models/Order");

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

router.post("/online", async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  const buyer = await User.findById(userId);
  const item = await Item.findById(itemId);
  const seller = await User.findById(item.soldBy);

  const order = await Order.create({
    item,
    buyer,
    seller,
    status: "Order Placed",
    deliveryDetails: { name: "Jonathan", contact: "+91 8056018282" },
  });
  buyer.buyingOrders.push(order.id);
  seller.sellingOrders.push(order.id);
  item.quantity = item.quantity - quantity;
  await buyer.save();
  await seller.save();
  await item.save();
  return res.json({ msg: "Success" });
});

module.exports = router;
