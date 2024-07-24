const express = require('express');
const router = express.Router();
const { Comment, User, Notification, Post } = require('../models');
const authenticateToken = require('../middleware/auth');
const { io } = require('../index');

router.get('/:postId', authenticateToken, async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { postId: req.params.postId },
            include: [{
                model: User,
                as: 'user',
                attributes: ['username']
            }]
        });
        res.json(comments);
    } catch (error) {
        console.error('Failed to fetch comments:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const { postId, text } = req.body;
    try {
        const comment = await Comment.create({
            userId: req.user.id,
            postId,
            text
        });

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Post:', post);
        console.log('Post User ID:', post.userId);
        console.log('User ID:', req.user.id);

        const notification = await Notification.create({
            userId: post.userId,
            fromUserId: req.user.id,
            type: 'comment',
            content: 'Commented on your post'
        });

        console.log('Notification:', notification);
        console.log('io:', io);

        if (io && post.userId) {
            io.to(post.userId.toString()).emit('new_notification', {
                type: 'comment',
                notification,
                comment,
            });
        }

        const fullComment = await Comment.findByPk(comment.id, {
            include: [{ model: User, as: 'user', attributes: ['username'] }]
        });

        res.json(fullComment);
    } catch (error) {
        console.error('Error creating comment:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to create comment' });
    }
});

module.exports = router;