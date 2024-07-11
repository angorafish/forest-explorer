const express = require('express');
const router = express.Router();
const { Trail } = require('../models');

router.get('/', async (req, res) => {
    try {
        const trails = await Trail.findAll();
        res.json(trails);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trails' });
    }
});

module.exports = router;
