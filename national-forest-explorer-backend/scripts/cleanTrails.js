const { Trail } = require("../models");

// Function to clean list of trails by removing those without names
const cleanTrails = async () => {
  try {
    // Remove trails where the name is null
    const result = await Trail.destroy({
      where: {
        name: null,
      },
    });
    console.log(`Removed ${result} trails with no names.`);
  } catch (error) {
    console.error("Error cleaning trails:", error);
  }
};

cleanTrails();
