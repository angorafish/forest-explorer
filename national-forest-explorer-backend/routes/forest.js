const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Forest } = require('../models');

router.get('/national-forests', async (req, res) => {
  try {
    const forests = await Forest.findAll();
    res.json(forests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch national forests data' });
  }
});

module.exports = router;
