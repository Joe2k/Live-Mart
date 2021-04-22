const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../validators/register");
const validateLoginInput = require("../validators/login");

// Load User model
const User = require("../models/User");

// SendGrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      console.log(req.body);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        location: req.body.marker,
        type: req.body.type,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  if (req.body.otp) {
    // Find user by email
    User.findOne({ email }).then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          if (req.body.otp === user.otp) {
            const payload = {
              id: user.id,
              name: user.name,
              location: user.location,
              type: user.type,
            };
            // Sign token
            jwt.sign(
              payload,
              process.env.SECRETKEY,
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          } else {
            return res.status(400).json({ otp: "OTP incorrect" });
          }
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  } else {
    // Find user by email
    User.findOne({ email }).then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          var otp = Math.floor(1000 + Math.random() * 9000);
          console.log(otp);

          const msg = {
            to: user.email, // Change to your recipient
            from: "jonathansamuel2k@gmail.com", // Change to your verified sender
            subject: "Live Mart Login OTP",
            html: `<h3>Live Mart Login</h3><p>Your login OTP is <strong>${otp}</strong></p>`,
          };

          // sgMail
          //   .send(msg)
          //   .then((response) => {
          //     console.log(response[0].statusCode);
          //     console.log(response[0].headers);
          //   })
          //   .catch((error) => {
          //     console.error(error);
          //   });

          User.findOneAndUpdate({ email }, { otp: otp }, (err, doc) => {
            if (err) console.log(err);
          });

          const payload = {
            id: user.id,
            name: user.name,
          };
          // Sign token
          jwt.sign(
            payload,
            process.env.SECRETKEY,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  }
});

module.exports = router;
