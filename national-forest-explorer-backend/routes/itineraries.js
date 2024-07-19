const express = require('express');
const router = express.Router();
const { Itinerary, ItineraryItem, User } = require('../models');
const authenticateToken = require('../middleware/auth');
const { sendInvitationEmail } = require('../services/emailService');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const itineraries = await Itinerary.findAll({ 
            where: { userId: req.user.id },
            include: { model: ItineraryItem, as: 'items' } 
        });
        res.json(itineraries);
    } catch (error) {
        console.error('Failed to fetch itineraries:', error);
        res.status(500).json({ error: 'Failed to fetch itineraries' });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const itinerary = await Itinerary.create({ ...req.body, userId: req.user.id });
        res.status(201).json(itinerary);
    } catch (error) {
        console.error('Failed to create itinerary:', error);
        res.status(500).json({ error: 'Failed to create itinerary' });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const itinerary = await Itinerary.findByPk(req.params.id, {
            include: { model: ItineraryItem, as: 'items' }
        });
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }
        res.json(itinerary);
    } catch (error) {
        console.error('Failed to fetch itinerary:', error);
        res.status(500).json({ error: 'Failed to fetch itinerary' });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const [updatedCount, updatedItineraries] = await Itinerary.update(req.body, { 
            where: { id: req.params.id, userId: req.user.id },
            returning: true,
        });

        if (updatedCount === 0) {
            return res.status(404).json({ error: 'Itinerary not found or user not authorized' });
        }

        res.json(updatedItineraries[0]);
    } catch (error) {
        console.error('Failed to update itinerary:', error);
        res.status(500).json({ error: 'Failed to update itinerary' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deletedCount = await Itinerary.destroy({ 
            where: { id: req.params.id, userId: req.user.id },
        });

        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Itinerary not found or user not authorized' });
        }

        res.json({ message: 'Itinerary deleted' });
    } catch (error) {
        console.error('Failed to delete itinerary:', error);
        res.status(500).json({ error: 'Failed to delete itinerary' });
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

module.exports = router;