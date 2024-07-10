const { User, Post, Review, Achievement } = require('../models');

const getUserFeed = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            include: [
                { model: Post, as: 'posts', include: [User] },
                { model: Review, as: 'reviews', include: [User] },
                { model: Achievement, as: 'achievements', include: [User] },
            ],
        });

        const feed = [
            ...user.posts.map(post => ({ ...post.toJSON(), type: 'post' })),
            ...user.reviews.map(review => ({ ...review.toJSON(), type: 'review' })),
            ...user.achievements.map(achievement => ({ ...achievement.toJSON(), type: 'achievement' })),
        ];

        feed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json(feed);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user feed' });
    }
};

module.exports = {
    getUserFeed
};