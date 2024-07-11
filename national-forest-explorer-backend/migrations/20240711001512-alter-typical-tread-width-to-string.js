'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Trails', 'typical_tread_width', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Trails', 'typical_tread_width', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  }
};
