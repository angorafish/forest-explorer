const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const authenticateToken = require("../middleware/auth");
const emailValidator = require("email-validator");
const router = express.Router();

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Helper function to validate password strength
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
// Helper function to create a JWT token
const createToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

// Route to verify the token
router.get("/verify", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

// Route to handle user signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received signup request", { username, email });

  if (!emailValidator.validate(email)) {
    console.log("Invalid email format");
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!validatePassword(password)) {
    console.log("Password does not meet requirements");
    return res
      .status(400)
      .json({
        error:
          "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.",
      });
  }
  try {
    const hashedPassword = await hashPassword(password);
    console.log("Creating user", { username, email });
    const user = await User.create({
      username,
      email,
      passwordHash: hashedPassword,
    });
    const token = createToken(user);
    res.json({ user, token });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Error signing up user" });
  }
});

// Route to handle user login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request", { username });
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = createToken(user);
    res.json({ user, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Error logging in user" });
  }
});

// Route to fetch authenticated user's details
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePhoto: user.profilePhoto,
      coverPhoto: user.coverPhoto,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
