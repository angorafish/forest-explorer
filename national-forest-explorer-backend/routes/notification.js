const express = require('express');
const router = express.Router();
const { Notification, User } = require('../models');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { userId: req.user.id },
            include: [{
                model: User,
                as: 'fromUser',
                attributes: ['username']
            }],
            order: [['createdAt', 'DESC']]
        });
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

router.put('/:id/read', authenticateToken, async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        if (notification.userId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        notification.status = 'read';
        await notification.save();
        res.json(notification);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
});

module.exports = router;