const express = require("express");
const router = express.Router();
const {
  User,
  Post,
  Review,
  Comment,
  Like,
  Notification,
  Photo,
} = require("../models");
const upload = require("../middleware/upload");
const authenticateToken = require("../middleware/auth");

// Route to fetch a user's post by their username
router.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.findAll({
      where: { userId: user.id },
      include: [
        { model: User, as: "user", attributes: ["username"] },
        { model: Review, as: "reviews" },
        {
          model: Comment,
          as: "comments",
          include: [{ model: User, as: "user", attributes: ["username"] }],
        },
        {
          model: Like,
          as: "likes",
          include: [{ model: User, as: "user", attributes: ["username"] }],
        },
        { model: Photo, as: "photos" },
      ],
    });

    console.log("Posts:", JSON.stringify(posts, null, 2));
    res.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Route to fetch a user's profile by their username
router.get("/profile/:username", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      include: [
        {
          model: Post,
          as: "posts",
          include: [
            { model: Like, as: "likes" },
            {
              model: Comment,
              as: "comments",
              include: [{ model: User, as: "user", attributes: ["username"] }],
            },
            { model: Review, as: "reviews" },
          ],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to update user's profile and cover photos
router.put(
  "/:username/photos",
  authenticateToken,
  upload.fields([{ name: "profilePhoto" }, { name: "coverPhoto" }]),
  async (req, res) => {
    try {
      const user = await User.findOne({
        where: { username: req.params.username },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (req.files.profilePhoto) {
        const profilePhotoUrl = req.files.profilePhoto[0].filename;
        user.profilePhoto = profilePhotoUrl;

        await Photo.create({
          userId: user.id,
          url: profilePhotoUrl,
          type: "profile",
        });

        await Notification.create({
          userId: user.id,
          fromUserId: req.user.id,
          type: "profile_photo_update",
          content: "Updated profile photo",
        });
      }
      if (req.files.coverPhoto) {
        const coverPhotoUrl = req.files.coverPhoto[0].filename;
        user.coverPhoto = coverPhotoUrl;

        await Photo.create({
          userId: user.id,
          url: coverPhotoUrl,
          type: "cover",
        });

        await Notification.create({
          userId: user.id,
          fromUserId: req.user.id,
          type: "cover_photo_update",
          content: "Updated cover photo",
        });
      }

      await user.save();
      res.json(user);
    } catch (error) {
      console.error("Error updating photos:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;