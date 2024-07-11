const express = require('express');
const router = express.Router();
const { Post, User, Review, Comment } = require('../models');

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

module.exports = router;
