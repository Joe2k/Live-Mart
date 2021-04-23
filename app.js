require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/user");
const items = require("./routes/item");

const app = express();

// Bodyparser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB Config
const db = process.env.MONGO_URI;
/* Connect to MongoDB */
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
require("./models/User");

// Cloudinary Config
require("./config/cloudinary")();

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
