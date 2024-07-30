require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { Sequelize, DataTypes } = require("sequelize");
// Initialize Sequelize with the database URL from .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

// Define the trail model
const Trail = sequelize.define(
  "Trail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    forest: {
      type: DataTypes.STRING,
    },
    segmentLength: {
      type: DataTypes.FLOAT,
    },
    trailSurface: {
      type: DataTypes.STRING,
    },
    managingOrg: {
      type: DataTypes.STRING,
    },
    accessibilityStatus: {
      type: DataTypes.STRING,
    },
    allowedTerraUse: {
      type: DataTypes.STRING,
    },
    allowedSnowUse: {
      type: DataTypes.STRING,
    },
    allowedWaterUse: {
      type: DataTypes.STRING,
    },
    typicalTrailGrade: {
      type: DataTypes.STRING,
    },
    typicalTreadWidth: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Trails",
    timestamps: false,
  }
);

// Load trails data from CSV file (data folder)
const loadTrailsData = async () => {
  try {
    const results = [];
    const ids = new Set();
    const filePath = path.join(__dirname, "../data/trail_data.csv");

    console.log(`Reading CSV file from path: ${filePath}`);

    // Read the CSV file and store the data in the results array
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        if (!ids.has(parseInt(data.id, 10))) {
          ids.add(parseInt(data.id, 10));
          results.push({
            id: parseInt(data.id, 10),
            name: data.name,
            state: data.state,
            forest: data.forest,
            segmentLength: parseFloat(data.segmentLength) || null,
            trailSurface: data.trailSurface,
            managingOrg: data.managingOrg,
            accessibilityStatus: data.accessibilityStatus,
            allowedTerraUse: data.allowedTerraUse,
            allowedSnowUse: data.allowedSnowUse,
            allowedWaterUse: data.allowedWaterUse,
            typicalTrailGrade: data.typicalTrailGrade,
            typicalTreadWidth: data.typicalTreadWidth,
          });
        }
      })
      .on("end", async () => {
        try {
          console.log(
            "CSV file read successfully. Inserting data into the database..."
          );
          await sequelize.sync({ alter: true });
          await Trail.bulkCreate(results, {
            ignoreDuplicates: true,
          });
          console.log("Trails data has been loaded successfully");
          process.exit(0);
        } catch (error) {
          console.error("Error loading trails data:", error);
          process.exit(1);
        }
      });
  } catch (error) {
    console.error("Error reading the CSV file:", error);
    process.exit(1);
  }
};

loadTrailsData();
