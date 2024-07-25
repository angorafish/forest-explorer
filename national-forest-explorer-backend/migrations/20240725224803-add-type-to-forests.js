'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Forests', 'type', {
      type: Sequelize.STRING,
      defaultValue: 'forest'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Forests', 'type');
  }
};