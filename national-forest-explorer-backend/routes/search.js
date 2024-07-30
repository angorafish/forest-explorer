const express = require("express");
const { Forest, Trail } = require("../models");
const router = express.Router();
const { Op } = require("sequelize");

router.get("/suggestions", async (req, res) => {
  const { q } = req.query;
  try {
    const forests = await Forest.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
    });
    const trails = await Trail.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
          [Op.not]: null,
        },
      },
    });

    const suggestions = [
      ...forests.map((forest) => ({ name: forest.name, type: "Forest" })),
      ...trails.map((trail) => ({ name: trail.name, type: "Trail" })),
    ];

    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  const { q } = req.query;
  try {
    const forests = await Forest.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
    });
    const trails = await Trail.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
          [Op.not]: null,
        },
      },
    });

    const results = [
      ...forests.map((forest) => ({
        id: forest.id,
        name: forest.name,
        type: "Forest",
        region: forest.region,
        shapeArea: forest.shapeArea,
      })),
      ...trails.map((trail) => ({
        id: trail.id,
        name: trail.name,
        type: "Trail",
        state: trail.state,
        forest: trail.forest,
      })),
    ];

    res.json(results);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
