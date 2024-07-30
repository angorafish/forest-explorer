const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.put("/", authenticateToken, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.passwordHash = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Failed to update settings", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Failed to delete account", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
