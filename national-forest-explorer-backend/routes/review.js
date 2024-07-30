const express = require("express");
const router = express.Router();
const { Review } = require("../models");
const authenticateToken = require("../middleware/auth");

router.post("/", authenticateToken, async (req, res) => {
  const { forestId, trailId, rating, comment, postId } = req.body;
  const userId = req.user.id;

  try {
    const review = await Review.create({
      userId,
      postId,
      forestId,
      trailId,
      rating,
      comment,
    });
    res.json(review);
  } catch (error) {
    console.error("Failed to create review:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
});

router.get("/:locationId", async (req, res) => {
  const { locationId } = req.params;
  try {
    const reviews = await Review.findAll({ where: { forestId: locationId } });
    res.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;
