const express = require("express");
const { Forest, Trail, Post } = require("../models");
const router = express.Router();

// Route to fetch details of a specific forest
router.get("/forests/:id", async (req, res) => {
  try {
    const forest = await Forest.findByPk(req.params.id, {
      include: [{ model: Post, as: "posts" }],
    });
    if (forest) {
      res.json(forest);
    } else {
      res.status(404).json({ error: "Forest not found" });
    }
  } catch (error) {
    console.error("Error fetching forest details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch details of a specific trail
router.get("/trails/:id", async (req, res) => {
  try {
    const trail = await Trail.findByPk(req.params.id, {
      include: [{ model: Post, as: "posts" }],
    });
    if (trail) {
      res.json(trail);
    } else {
      res.status(404).json({ error: "Trail not found" });
    }
  } catch (error) {
    console.error("Error fetching trail details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch details of a specific post
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
