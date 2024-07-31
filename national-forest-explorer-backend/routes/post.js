const express = require("express");
const router = express.Router();
const {
  Post,
  User,
  Review,
  Comment,
  Like,
  Photo,
} = require("../models");
const authenticateToken = require("../middleware/auth");
const upload = require("../middleware/upload");

// Route to fetch all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: "user", attributes: ["username"] },
        { model: Review, as: "reviews" },
        {
          model: Comment,
          as: "comments",
          include: [{ model: User, as: "user", attributes: ["username"] }],
        },
        { model: Like, as: "likes" },
        { model: Photo, as: "photos" },
      ],
    });
    res.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Route to fetch a specific post by ID
router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  console.log(`Fetching post with ID: ${postId}`);

  try {
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, as: "user", attributes: ["username"] },
        { model: Review, as: "reviews" },
        {
          model: Comment,
          as: "comments",
          include: [{ model: User, as: "user", attributes: ["username"] }],
        },
        { model: Like, as: "likes" },
        { model: Photo, as: "photos" },
      ],
    });

    if (!post) {
      console.log(`Post with ID: ${postId} not found`);
      return res.status(404).json({ error: "Post not found" });
    }

    console.log(`Post with ID: ${postId} found`);
    res.json(post);
  } catch (error) {
    console.error(`Failed to fetch post with ID: ${postId}`, error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Route to create a new post
router.post(
    "/",
    authenticateToken,
    upload.single("photo"),
    async (req, res) => {
      try {
        const { postType, location, rating, reviewText } = req.body;
        const userId = req.user.id;
  
        console.log("Creating post with data:", { postType, location, rating, reviewText, userId });
        console.log("File info:", req.file);
  
        const post = await Post.create({
          postType,
          location,
          rating,
          reviewText,
          userId,
        });
  
        if (req.file) {
          const photoUrl = `/uploads/${req.file.filename}`;
          console.log("Creating photo with URL:", photoUrl);
          await Photo.create({
            userId,
            postId: post.id,
            url: photoUrl,
            type: "post",
          });
        }
  
        const fullPost = await Post.findByPk(post.id, {
          include: [
            { model: User, as: "user", attributes: ["username"] },
            { model: Review, as: "reviews" },
            {
              model: Comment,
              as: "comments",
              include: [{ model: User, as: "user", attributes: ["username"] }],
            },
            { model: Like, as: "likes" },
            { model: Photo, as: "photos" },
          ],
        });
  
        res.status(201).json(fullPost);
      } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Failed to create post" });
      }
    }
  );  

// Route to update an existing post
router.put(
  "/:id",
  authenticateToken,
  upload.single("photo"),
  async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      console.log("Post before update:", post);
      console.log("Request body:", req.body);

      if (!post) {
        console.log(`Post with ID: ${req.params.id} not found`);
        return res.status(404).json({ error: "Post not found" });
      }
      if (post.userId !== req.user.id) {
        console.log(`User ${req.user.id} not authorized to update post with ID: ${req.params.id}`);
        return res.status(403).json({ error: "Unauthorized" });
      }

      const { location, rating, reviewText } = req.body;
      post.location = location;
      if (post.postType === "review") {
        post.rating = rating;
        post.reviewText = reviewText;
      }
      if (req.file) {
        const photoUrl = `/uploads/${req.file.filename}`;
        console.log("Updating/creating photo with URL:", photoUrl);
        const photo = await Photo.findOne({ where: { postId: post.id } });
        if (photo) {
          photo.url = photoUrl;
          await photo.save();
        } else {
          await Photo.create({
            postId: post.id,
            url: photoUrl,
            userId: req.user.id,
          });
        }
      }
      await post.save();
      res.json(post);
    } catch (error) {
      console.error("Failed to update post", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  }
);

// Route to delete a post
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      console.log(`Post with ID: ${req.params.id} not found`);
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.userId !== req.user.id) {
      console.log(`User ${req.user.id} not authorized to delete post with ID: ${req.params.id}`);
      return res.status(403).json({ error: "Unauthorized" });
    }
    await Photo.destroy({ where: { postId: post.id } });
    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Failed to delete post", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;