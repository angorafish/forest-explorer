const express = require("express");
const { SavedLocation, Forest, Trail } = require("../models");
const router = express.Router();

// Route to fetch saved location for a specific user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching saved locations for user: ${userId}`);

  try {
    const savedLocations = await SavedLocation.findAll({ where: { userId } });
    console.log(`Found saved locations: ${savedLocations.length}`);
    console.log(savedLocations);

    const detailedSavedLocations = await Promise.all(
      savedLocations.map(async (location) => {
        let details;
        switch (location.locationType) {
          case "forest":
            details = await Forest.findByPk(location.locationId);
            break;
          case "trail":
            details = await Trail.findByPk(location.locationId);
            break;
          default:
            details = null;
        }

        console.log(`Location details: ${JSON.stringify(details)}`);

        return {
          ...location.toJSON(),
          name: details ? details.name : "Unknown",
        };
      })
    );

    res.json(detailedSavedLocations);
  } catch (error) {
    console.error("Error retrieving saved locations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to save a location
router.post("/save", async (req, res) => {
  const { userId, locationId, locationType } = req.body;

  try {
    const savedLocation = await SavedLocation.create({
      userId,
      locationId,
      locationType,
    });
    res.json(savedLocation);
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to unsave a location
router.delete("/unsave", async (req, res) => {
  const { userId, locationId, locationType } = req.body;

  try {
    const unsavedLocation = await SavedLocation.destroy({
      where: { userId, locationId, locationType },
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error unsaving location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
