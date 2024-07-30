"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Trails", "typicalTreadWidth", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Trails", "typicalTreadWidth", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },
};
