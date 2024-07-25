const express = require('express');
const { Campsite, Forest, Trail } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');

router.get('/suggestions', async (req, res) => {
  const { q } = req.query;
  try {
    const campsites = await Campsite.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`
        }
      }
    });
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
          [Op.iLike]: `%${q}%`
        }
      }
    });

    const suggestions = [
      ...campsites.map(site => ({ name: site.name, type: 'Campsite' })),
      ...forests.map(forest => ({ name: forest.name, type: 'Forest' })),
      ...trails.map(trail => ({ name: trail.name, type: 'Trail' })),
    ];

    console.log('Suggestions:', suggestions); // Log the suggestions
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

    if (!destination || destination === 'campsite') {
      const campsites = await Campsite.findAll({
        where: {
          name: {
            [Op.iLike]: `%${q}%`
          },
          ...(state && { state })
        }
      });
      results = results.concat(
        campsites.map(site => ({
          id: site.id,
          name: site.name,
          type: 'Campsite',
          state: site.state,
          forest: site.forest,
        }))
      );
    }

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
            [Op.iLike]: `%${q}%`
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

router.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const campsite = await Campsite.findByPk(id);
    const forest = await Forest.findByPk(id);
    const trail = await Trail.findByPk(id);

    const result = campsite || forest || trail;

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
