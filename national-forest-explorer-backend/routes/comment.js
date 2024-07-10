const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');
const authenticateToken = require('../middleware/auth');

router.get('/:postId', authenticateToken, async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { postId: req.params.postId },
            include: [{
                model: User,
                as: 'User',
                attributes: ['username']
            }]
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const { postId, text } = req.body;
    try {
        const comment = await Comment.create({
            userId: req.user.id,
            postId,
            text,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' });
    }
});

module.exports = router;
