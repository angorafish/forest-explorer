const express = require('express');
const router = express.Router();
const campsiteService = require('../services/campsiteService');

router.get('/', async (req, res) => {
    try {
        const campsites = await campsiteService.getAllCampsites();
        res.json(campsites);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch campsites' });
    }
});

module.exports = router;
