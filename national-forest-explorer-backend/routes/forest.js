const express = require("express");
const router = express.Router();
const forestService = require("../services/forestService");

// Route to fetch all forests from database
router.get("/", async (req, res) => {
  try {
    const forests = await forestService.getAllForests();
    res.json(forests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch national forests data" });
  }
});

module.exports = router;
