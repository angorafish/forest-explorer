const { User, Post, Review, Achievement } = require("../models");

// Controller function to get user details by ID
const getUser = async (req, res) => {
  try {
    // Find user by primary key and include associated posts and reviews
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Post, as: "posts" },
        { model: Review, as: "reviews" },
      ],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update user details
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, profilePicture, coverPhoto, profilePhoto } =
      req.body;

    // Find user by primary key
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details with provided values or keep existing ones
    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePicture = profilePicture || user.profilePicture;
    user.coverPhoto = coverPhoto || user.coverPhoto;
    user.profilePhoto = profilePhoto || user.profilePhoto;

    // Save updated user details
    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Find user by primary key
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
