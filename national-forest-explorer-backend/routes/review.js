const express = require('express');
const router = express.Router();
const { Review } = require('../models');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, async (req, res) => {
  const { forest_id, trail_id, campsite_id, rating, comment } = req.body;
  const user_id = req.user.id;

  try {
    const review = await Review.create({
      user_id,
      forest_id,
      trail_id,
      campsite_id,
      rating,
      comment,
    });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

router.get('/:locationId', async (req, res) => {
  const { locationId } = req.params;
  try {
    const reviews = await Review.findAll({ where: { forest_id: locationId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;