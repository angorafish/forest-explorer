const { Trail } = require('../models');

const cleanTrails = async () => {
  try {
    const result = await Trail.destroy({
      where: {
        name: null
      }
    });
    console.log(`Removed ${result} trails with no names.`);
  } catch (error) {
    console.error('Error cleaning trails:', error);
  }
};

cleanTrails();