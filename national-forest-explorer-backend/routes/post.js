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
                { model: User, as: 'user', attributes: ['username'] },
                { model: Review, as: 'reviews' },
                { model: Comment, as: 'comments', include: [{ model: User, as: 'user', attributes: ['username'] }] },
                { model: Like, as: 'likes' },
                { model: Photo, as: 'photos' }
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
                { model: User, as: 'user', attributes: ['username'] },
                { model: Review, as: 'reviews' },
                { model: Comment, as: 'comments', include: [{ model: User, as: 'user', attributes: ['username'] }] },
                { model: Like, as: 'likes' },
                { model: Photo, as: 'photos' }
            ]
        });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (error) {
        console.error('Failed to fetch post', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

router.post('/', authenticateToken, upload.single('photo'), async (req, res) => {
    try {
        const { postType, location, rating, reviewText } = req.body;
        const userId = req.user.id;

        const post = await Post.create({ postType, location, rating, reviewText, userId });

        if (req.file) {
            const photoUrl = `/uploads/${req.file.filename}`;
            await Photo.create({ userId, postId: post.id, url: photoUrl, type: 'post' });
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

router.put('/:id', authenticateToken, upload.single('photo'), async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        if (post.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

        const { location, rating, reviewText } = req.body;
        post.location = location;
        if (post.postType === 'review') {
            post.rating = rating;
            post.reviewText = reviewText;
        }
        if (req.file) {
            const photoUrl = `/uploads/${req.file.filename}`;
            const photo = await Photo.findOne({ where: { postId: post.id } });
            if (photo) {
                photo.url = photoUrl;
                await photo.save();
            } else {
                await Photo.create({ postId: post.id, url: photoUrl, userId: req.user.id });
            }
        }
        await post.save();
        res.json(post);
    } catch (error) {
        console.error('Failed to update post', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        if (post.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
        await Photo.destroy({ where: { postId: post.id } });
        await post.destroy();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Failed to delete post', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

module.exports = router;