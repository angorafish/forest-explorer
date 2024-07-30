"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Trails", "type", {
      type: Sequelize.STRING,
      defaultValue: "trail",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Trails", "type");
  },
};
