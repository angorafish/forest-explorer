require("dotenv").config();
const axios = require("axios");
const { sequelize, Forest } = require("../models");
// Function to fetch and insert the forest data from an external API
const fetchForestData = async () => {
  try {
    console.log("Fetching forest data...");
    const response = await axios.get(
      "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_ForestSystemBoundaries_01/MapServer/0/query",
      {
        params: {
          where: "1=1", // Query parameter to fetch all records
          outFields: "*", // Fetch all fields
          f: "json", // Response format
        },
      }
    );
    console.log("Forest data response:", response.data);
    const forests = response.data.features;

    if (!Array.isArray(forests)) {
      throw new Error("Forests data is not an array");
    }

    // Insert or update each forest record in the database
    for (const forest of forests) {
      await Forest.upsert({
        adminForestId: forest.attributes.ADMINFORESTID,
        region: forest.attributes.REGION,
        forestNumber: forest.attributes.FORESTNUMBER,
        forestOrgCode: forest.attributes.FORESTORGCODE,
        name: forest.attributes.FORESTNAME,
        gisAcres: forest.attributes.GIS_ACRES,
        shapeLength: forest.attributes.SHAPE_Length,
        shapeArea: forest.attributes.SHAPE_Area,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    console.log("Forest data fetched and inserted successfully");
  } catch (error) {
    console.error("Error fetching or inserting forest data:", error);
  } finally {
    await sequelize.close();
  }
};

module.exports = fetchForestData;

// Main function to authenticate and fetch forest data
const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await fetchForestData();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();