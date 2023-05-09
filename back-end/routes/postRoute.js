const express = require("express");
const router = express.Router();

const PostModel = require("../models/PostModel");
const verifyToken = require("../middleware/authMiddleware");

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

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
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/posts
// @desc Get posts
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await PostModel.find({ user: req.userId }).populate({
      path: "user",
      select: "-password",
    });
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description: description || "",
      status,
      url: url ? (url.startsWith("https://") ? url : `https://${url}`) : "",
    };

    const postFilter = { _id: req.params.id, user: req.userId };
    //  {new:true} the updatedPost will be the new one instead of the old one
    updatedPost = await PostModel.findOneAndUpdate(postFilter, updatedPost, {
      new: true,
    });

    //   User not authorized to update post or post not found
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorized",
      });
    }

    return res.json({
      success: "true",
      message: "Post updated",
      post: updatedPost,
    });

    //   TODO: check to understand everything
    //   See the network log
    //   Watched till 1:20
  } catch (error) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postFilter = { _id: req.params.id, user: req.userId };
    const deletedPost = await PostModel.findOneAndDelete(postFilter);

    //   Check if post found or not
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorized",
      });
    }

    return res.json({
      success: "true",
      message: "Post deleted",
      post: deletedPost,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;