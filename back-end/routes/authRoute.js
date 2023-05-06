const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");

const UserModel = require("../models/UserModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// @route POST api/auth/register
// @desc Register user
// @access Public

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username) {
    res.status(400).json({ success: false, message: "User name is required" });
  }
  if (!password) {
    res.status(400).json({ success: false, message: "Password is required" });
  }

  try {
    // Check for duplicate username
    // const user = await User.findOne()
    // TODO: validate password
    const user = await UserModel.findOne({ username });
    if (user)
      res
        .status(400)
        .json({ success: false, message: "User name already exists" });
    // Username and password are good
    const hashedPassword = await argon2.hash(password);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    // Return token
    // Sign web token
    // After newUser.save() newUser will be created and there will be id field

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public

router.post("/login", async function (req, res) {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: "User name is required" });
  }

  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  try {
    // Check for correct username and password
    const user = await UserModel.findOne({ username });
    if (!user || !(await argon2.verify(user.password, password))) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.json({ success: true, message: "Logged in successfully", accessToken });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;