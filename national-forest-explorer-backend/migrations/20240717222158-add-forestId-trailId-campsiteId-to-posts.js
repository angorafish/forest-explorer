'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Posts');
    
    if (!tableInfo.forestId) {
      await queryInterface.addColumn('Posts', 'forestId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Forests',
          key: 'id'
        }
      });
    }

    if (!tableInfo.trailId) {
      await queryInterface.addColumn('Posts', 'trailId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Trails',
          key: 'id'
        }
      });
    }

    if (!tableInfo.campsiteId) {
      await queryInterface.addColumn('Posts', 'campsiteId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Campsites',
          key: 'id'
        }
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'forestId');
    await queryInterface.removeColumn('Posts', 'trailId');
    await queryInterface.removeColumn('Posts', 'campsiteId');
  }
};