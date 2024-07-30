const { sequelize } = require("../models");

module.exports = async () => {
  if (global.server) {
    global.server.close();
  }
  await sequelize.close();
};
