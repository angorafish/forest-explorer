const { sequelize } = require('../models');

const setupTestDB = async () => {
  await sequelize.sync({ force: true });
  console.log("Database synced successfully!");
};

module.exports = setupTestDB;