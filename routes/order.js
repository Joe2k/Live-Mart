const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Item = require("../models/Item");
const Order = require("../models/Order");

// SendGrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

  const msg1 = {
    to: seller.email, // Change to your recipient
    from: "jonathansamuel2k@gmail.com", // Change to your verified sender
    subject: "Live Mart Offline Booking",
    html: `<h3>Live Mart Offline Booking</h3><p>${
      buyer.name
    } is coming to buy item ${item.name} on ${date.split("T")[0]} at ${
      date.split("T")[1]
    } </strong></p>`,
  };

  sgMail
    .send(msg1)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });

  const msg2 = {
    to: buyer.email, // Change to your recipient
    from: "jonathansamuel2k@gmail.com", // Change to your verified sender
    subject: "Live Mart Offline Booking",
    html: `<h3>Live Mart Offline Booking</h3><p>You have sheduled to buy ${
      item.name
    } on ${date.split("T")[0]} at ${date.split("T")[1]}  </strong></p>`,
  };

  sgMail
    .send(msg2)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
  return res.json({ msg: "Success" });
});

router.post("/online", async (req, res) => {
  const { userId, itemId, quantity, cost } = req.body;

  const buyer = await User.findById(userId);
  const item = await Item.findById(itemId);
  const seller = await User.findById(item.soldBy);

  const order = await Order.create({
    item,
    buyer,
    seller,
    status: "Order Placed",
    deliveryDetails: { name: "Jonathan", contact: "+91 8056018282" },
    cost,
    quantity,
  });
  buyer.buyingOrders.push(order.id);
  seller.sellingOrders.push(order.id);
  item.quantity = item.quantity - quantity;
  await buyer.save();
  await seller.save();
  await item.save();
  return res.json({ msg: "Success" });
});

router.get("/myorder/:id", async (req, res) => {
  User.findById(req.params.id)
    .populate({
      path: "buyingOrders",
      populate: { path: "item seller" },
    })
    .populate({
      path: "sellingOrders",
      populate: { path: "item buyer" },
    })
    .exec((err, doc) => {
      res.json(doc);
    });
});

router.get("/myevents/:id", async (req, res) => {
  User.findById(req.params.id)
    .populate(
      "sellingEvents.buyer sellingEvents.item buyingEvents.seller buyingEvents.item"
    )
    .exec(function (err, doc) {
      res.json(doc);
    });
});

router.get("/all", async (req, res) => {
  Order.find({})
    .populate("item buyer seller")
    .exec(function (err, docs) {
      res.json(docs);
    });
});

router.post("/delivery", async (req, res) => {
  const order = await Order.findById(req.body.id);
  if (order.status === "Order Placed") {
    order.status = "In Transit";
  } else {
    order.status = "Delivered";
  }
  await order.save();
  res.json({ msg: "suc" });
});

module.exports = router;
