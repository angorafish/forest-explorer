'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Posts', 'forestId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Posts', 'forestId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
