'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Photos');
    if (!tableInfo.postId) {
      await queryInterface.addColumn('Photos', 'postId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Posts',
          key: 'id'
        }
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Photos', 'postId');
  }
};