"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Photos", "type", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "post",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Photos", "type");
  },
};
