const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

// Function to generate an access token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};

// Controller function to handle user login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    // Generate an access token for the user
    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
    });
    res.json({ accessToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  loginUser,
};
