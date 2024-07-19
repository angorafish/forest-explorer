const express = require('express');
const router = express.Router();
const { ItineraryItem, Itinerary, Forest, Trail, Campsite } = require('../models');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, async (req, res) => {
    const { itineraryId, forestId, trailId, campsiteId, date, time, note } = req.body;
    try {
        const itinerary = await Itinerary.findByPk(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        const item = await ItineraryItem.create({
            itineraryId,
            forestId,
            trailId,
            campsiteId,
            date,
            time,
            note,
        });
        res.status(201).json(item);
    } catch (error) {
        console.error('Failed to create itinerary item:', error);
        res.status(500).json({ error: 'Failed to create itinerary item' });
    }
});

router.get('/:itineraryId', authenticateToken, async (req, res) => {
    try {
        const items = await ItineraryItem.findAll({ where: { itineraryId: req.params.itineraryId } });
        res.json(items);
    } catch (error) {
        console.error('Failed to fetch itinerary items:', error);
        res.status(500).json({ error: 'Failed to fetch itinerary items' });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const item = await ItineraryItem.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Itinerary item not found' });
        }
        await item.update(req.body);
        res.json(item);
    } catch (error) {
        console.error('Failed to update itinerary item:', error);
        res.status(500).json({ error: 'Failed to update itinerary item' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const item = await ItineraryItem.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Itinerary item not found' });
        }
        await item.destroy();
        res.json({ message: 'Itinerary item deleted' });
    } catch (error) {
        console.error('Failed to delete itinerary item:', error);
        res.status(500).json({ error: 'Failed to delete itinerary item' });
    }
});

module.exports = router;