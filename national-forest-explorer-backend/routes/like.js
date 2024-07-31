const express = require("express");
const router = express.Router();
const { Like, Post, Notification } = require("../models");
const authenticateToken = require("../middleware/auth");

// Route to like a post
router.post("/:postId", authenticateToken, async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const userId = req.user.id;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingLike = await Like.findOne({ where: { postId, userId } });
    if (existingLike) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    console.log(`Creating like with postId: ${postId}, userId: ${userId}`);
    const like = await Like.create({ postId, userId });

    await Notification.create({
      userId: post.userId,
      fromUserId: userId,
      type: "like",
    });

    res.status(201).json({ postId, userId });
  } catch (error) {
    console.error("Failed to like post:", error);
    res.status(500).json({ message: "Failed to like post" });
  }
});

// Route to unlike a post
router.delete("/:postId", authenticateToken, async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const userId = req.user.id;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingLike = await Like.findOne({ where: { postId, userId } });
    if (!existingLike) {
      return res.status(400).json({ message: "You have not liked this post" });
    }

    await existingLike.destroy();

    res.json({ message: "Post unliked successfully" });
  } catch (error) {
    console.error("Failed to unlike post:", error);
    res.status(500).json({ message: "Failed to unlike post" });
  }
});

module.exports = router;