const express = require('express');
const router = express.Router();
const { Photo, Post } = require('../models');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');

router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const photos = await Photo.findAll({ where: { userId: req.params.userId } });
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

router.get('/post/:postId', authenticateToken, async (req, res) => {
  try {
    const photos = await Photo.findAll({ where: { postId: req.params.postId } });
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

router.post('/', authenticateToken, upload.array('photos'), async (req, res) => {
    try {
        const { postType, location, rating, reviewText } = req.body;
        const userId = req.user.id;

        const post = await Post.create({
            postType,
            location,
            rating,
            reviewText,
            userId
        });

        if (req.files) {
            const photoUrls = req.files.map(file => path.relative(__dirname, file.path));
            for (const url of photoUrls) {
                await Photo.create({
                    userId,
                    postId: post.id,
                    url,
                    type: 'post'
                });
            }
        }

        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Failed to create post' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    if (photo.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await photo.destroy();
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

module.exports = router;