const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");

var multer = require("multer");
const storage = multer.diskStorage({
  destination: "./uploads",
  filename(req, file, cb) {
    let newName = Date.now() + "-" + file.originalname;
    newName = newName.split(" ").join("_");
    cb(null, newName);
  },
});
const upload = multer({ storage });
const cloudinary = require("cloudinary").v2;

const User = require("../models/User");
const Item = require("../models/Item");

router.post("/create", upload.single("photo"), async (req, res) => {
  console.log(req.body.name, req.body);
  cloudinary.uploader.upload(req.file.path, async (error, result) => {
    if (error) {
      return res.json({ msg: "error" });
    } else {
      console.log(result.url);
      const item = await Item.create({
        ...req.body,
        url: result.url,
        boughtBy: [],
      });
      User.findByIdAndUpdate(req.body.soldBy, {
        $push: { sellingItems: mongoose.Types.ObjectId(item.id) },
      });
      fs.unlinkSync(req.file.path);
      return res.status(200).json(item);
    }
  });
});

router.get("/all", (req, res) => {
  Item.find({})
    .populate("soldBy")
    .exec((err, docs) => res.json(docs));
});

module.exports = router;
