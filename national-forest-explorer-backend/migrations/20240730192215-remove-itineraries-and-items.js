'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Itineraries');
    await queryInterface.dropTable('ItineraryItems');
  },

  down: async (queryInterface, Sequelize) => {
  }
};