const express = require('express');
const { Forest, Trail } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');

router.get('/suggestions', async (req, res) => {
  const { q } = req.query;
  try {
    const forests = await Forest.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`
        }
      }
    });
    const trails = await Trail.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
          [Op.not]: null
        }
      }
    });

    const suggestions = [
      ...forests.map(forest => ({ name: forest.name, type: 'Forest' })),
      ...trails.map(trail => ({ name: trail.name, type: 'Trail' })),
    ];

    console.log('Suggestions:', suggestions);
    res.json(suggestions);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  const { q, state, destination } = req.query;
  try {
    let results = [];

    if (!destination || destination === 'forest') {
      const forests = await Forest.findAll({
        where: {
          name: {
            [Op.iLike]: `%${q}%`
          },
          ...(state && { state })
        }
      });
      results = results.concat(
        forests.map(forest => ({
          id: forest.id,
          name: forest.name,
          type: 'Forest',
          state: forest.state,
          forest: forest.name,
        }))
      );
    }

    if (!destination || destination === 'trail') {
      const trails = await Trail.findAll({
        where: {
          name: {
            [Op.iLike]: `%${q}%`,
            [Op.not]: null
          },
          ...(state && { state })
        }
      });
      results = results.concat(
        trails.map(trail => ({
          id: trail.id,
          name: trail.name,
          type: 'Trail',
          state: trail.state,
          forest: trail.forest,
        }))
      );
    }

    console.log('Search results:', results);
    res.json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;