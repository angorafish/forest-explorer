const express = require('express');
const router = express.Router();
const { Post, Notification, User, Review, Comment, Like, Photo } = require('../models');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username']
        },
        {
          model: Review,
          as: 'reviews'
        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['username']
            }
          ]
        },
        {
          model: Like,
          as: 'likes'
        },
        {
          model: Photo,
          as: 'photos'
        }
      ]
    });
    res.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username']
        },
        {
          model: Review,
          as: 'reviews'
        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['username']
            }
          ]
        },
        {
          model: Like,
          as: 'likes'
        },
        {
          model: Photo,
          as: 'photos'
        }
      ]
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Failed to fetch post', error);
    res.status(500).json({ error: 'Failed to fetch post' });
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
      const photoUrls = req.files.map(file => {
        return { 
          userId, 
          postId: post.id, 
          url: `/uploads/${file.filename}`,
          type: 'post' 
        };
      });

      await Photo.bulkCreate(photoUrls);
    }

    const fullPost = await Post.findByPk(post.id, {
      include: [
        { model: User, as: 'user', attributes: ['username'] },
        { model: Review, as: 'reviews' },
        { model: Comment, as: 'comments', include: [{ model: User, as: 'user', attributes: ['username'] }] },
        { model: Like, as: 'likes' },
        { model: Photo, as: 'photos' }
      ]
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingLike = await Like.findOne({
      where: {
        userId: req.user.id,
        postId: req.params.id
      }
    });

    if (existingLike) {
      return res.status(400).json({ message: 'You already liked this post' });
    }

    await Like.create({
      userId: req.user.id,
      postId: req.params.id
    });

    await Notification.create({
      userId: post.userId,
      fromUserId: req.user.id,
      type: 'like',
    });

    res.json({ message: 'Post liked and notification created' });
  } catch (error) {
    console.error('Failed to like post and create notification', error);
    res.status(500).json({ message: 'Failed to like post and create notification' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await post.update(req.body);
    res.json(post);
  } catch (error) {
    console.error('Failed to update post', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await post.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete post', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;