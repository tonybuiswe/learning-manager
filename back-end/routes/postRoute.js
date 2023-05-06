const express = require('express')
const router = express.Router();

const PostModel = require("back-end/models/PostModel");
const verifyToken = require("back-end/middleware/authMiddleware");

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken,async (req,res) => {
  const { title, description, url, status, user } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newPost = new PostModel({
      title,
      description,
      url: url.startsWith("https://") ? url : `https:${url}`,
      status: status || 'TO LEARN',
      user: '6455a1ff59213e018d4d871a'
    });

    await newPost.save()
    res.json({success: 'true', message: 'Post successfully', post: newPost})

  } catch (error) {
    console.log(e)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
});

module.exports = router