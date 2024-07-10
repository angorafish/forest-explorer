const express = require('express');
const router = express.Router();
const { Itinerary } = require('../models');
const authenticateToken = require('../middleware/auth');
const { sendInvitationEmail } = require('../services/emailService');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const itineraries = await Itinerary.findAll({ where: { userId: req.user.id } });
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch itineraries' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const itineraries = await Itinerary.findAll({ where: { userId: req.user.id } });
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch itineraries' });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedItinerary = await Itinerary.update(req.body, { where: { id: req.params.id, userId: req.user.id } });
        res.json(updatedItinerary);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update itinerary' });
    }
});

router.post('/:id/invite', authenticateToken, async (req, res) => {
    try {
        const { email } = req.body;
        const itineraryId = req.params.id;

        const itinerary = await Itinerary.findByPk(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        await sendInvitationEmail(email, itinerary);

        res.json({ message: 'Invitation sent' });
    } catch (error) {
        console.error('Failed to send invitation:', error);
        res.status(500).json({ error: 'Failed to send invitation' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await Itinerary.destroy({ where: { id: req.params.id, userId: req.user.id } });
        res.json({ message: 'Itinerary deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete itinerary' });
    }
});

module.exports = router;