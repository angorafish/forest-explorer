'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Temporarily drop the foreign key constraint
    await queryInterface.removeConstraint('Posts', 'Posts_forestId_fkey');

    // Temporarily rename the existing column
    await queryInterface.renameColumn('Forests', 'id', 'id_temp');
    
    // Add the new id column with INTEGER type
    await queryInterface.addColumn('Forests', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    });

    // Copy the data from id_temp to id
    await queryInterface.sequelize.query(
      'UPDATE "Forests" SET "id" = CAST("id_temp" AS INTEGER);'
    );

    // Remove the temporary column
    await queryInterface.removeColumn('Forests', 'id_temp');

    // Re-add the foreign key constraint
    await queryInterface.addConstraint('Posts', {
      fields: ['forestId'],
      type: 'foreign key',
      name: 'Posts_forestId_fkey',
      references: {
        table: 'Forests',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Temporarily drop the foreign key constraint
    await queryInterface.removeConstraint('Posts', 'Posts_forestId_fkey');

    // Reverse the changes if needed
    await queryInterface.addColumn('Forests', 'id_temp', {
      type: Sequelize.STRING,
    });

    await queryInterface.sequelize.query(
      'UPDATE "Forests" SET "id_temp" = "id";'
    );

    await queryInterface.removeColumn('Forests', 'id');

    await queryInterface.renameColumn('Forests', 'id_temp', 'id');

    // Re-add the foreign key constraint
    await queryInterface.addConstraint('Posts', {
      fields: ['forestId'],
      type: 'foreign key',
      name: 'Posts_forestId_fkey',
      references: {
        table: 'Forests',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },
};