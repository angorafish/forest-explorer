const express = require('express');
const router = express.Router();
const { getUserFeed } = require('../controllers/feedController');

router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const feed = await Feed.findAll({
            where: { userId },
            include: [{ model: User, as: 'author' }]
        });
        res.json(feed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch feed' });
    }
});

module.exports = router;