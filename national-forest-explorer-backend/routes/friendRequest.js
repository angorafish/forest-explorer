const express = require('express');
const router = express.Router();
const { FriendRequest, User, Notification } = require('../models');
const authenticateToken = require('../middleware/auth');
const { io } = require('../index');

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { receiverId } = req.body;
        const existingRequest = await FriendRequest.findOne({
            where: {
                requesterId: req.user.id,
                receiverId
            }
        });
        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent' });
        }

        const friendRequest = await FriendRequest.create({
            requesterId: req.user.id,
            receiverId,
            status: 'pending'
        });

        const notification = await Notification.create({
            userId: receiverId,
            fromUserId: req.user.id,
            type: 'friend_request',
        });

        io.to(receiverId.toString()).emit('new_notification', {
            type: 'friend_request',
            notification,
            friendRequest,
        });

        res.status(201).json(friendRequest);
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id/accept', authenticateToken, async (req, res) => {
    try {
        const friendRequest = await FriendRequest.findByPk(req.params.id);
        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        if (friendRequest.receiverId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        friendRequest.status = 'accepted';
        await friendRequest.save();

        const notification = await Notification.create({
            userId: friendRequest.requesterId,
            fromUserId: req.user.id,
            type: 'friend_accept',
        });

        io.to(friendRequest.requesterId.toString()).emit('new_notification', {
            type: 'friend_accept',
            notification,
        });

        res.json(friendRequest);
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;