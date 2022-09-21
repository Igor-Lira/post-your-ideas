const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Auth failed!" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Auth failed!" });
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      "secrete_this_should_be_longer",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      expiresIn: 3600,
      userId: user._id,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Auth failed",
      err,
    });
  }
});

module.exports = router;
