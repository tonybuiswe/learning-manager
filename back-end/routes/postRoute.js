const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const verifyToken = require("../middleware/authMiddleware");

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status, userId } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newPost = new PostModel({
      user: req.userId,
      title,
      description,
      url: url.startsWith("https://") ? url : `https:${url}`,
      status: status || "TO LEARN",
    });

    await newPost.save();
    res.json({ success: "true", message: "Post successfully", post: newPost });
  } catch (error) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/posts
// @desc Get posts
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await PostModel.find({ user: req.userId }).populate({
      path: 'user',
      select: '-password'
    });
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });

  }
});
module.exports = router;