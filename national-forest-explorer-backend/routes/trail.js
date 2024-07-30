const express = require("express");
const router = express.Router();
const trailService = require("../services/trailService");

router.get("/", async (req, res) => {
  try {
    const trails = await trailService.getAllTrails();
    res.json(trails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trails" });
  }
});

module.exports = router;
