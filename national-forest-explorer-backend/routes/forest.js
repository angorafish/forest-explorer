const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/national-forests', async (req, res) => {
  try {
    const response = await axios.get('https://developer.nps.gov/api/v1/parks?limit=500&api_key=' + process.env.NPS_API_KEY);
    const forests = response.data.data.filter(park => park.designation === 'National Forest');
    res.json(forests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch national forests data' });
  }
});

module.exports = router;
