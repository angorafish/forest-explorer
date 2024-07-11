const express = require('express');
const router = express.Router();
const { Campsite } = require('../models');

router.get('/', async (req, res) => {
    try {
        const campsites = await Campsite.findAll();
        res.json(campsites);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch campsites' });
    }
});

module.exports = router;
