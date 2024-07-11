'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trailId: {
        type: Sequelize.STRING(50),
        unique: true
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      segmentLength: {
        type: Sequelize.DOUBLE
      },
      managingOrg: {
        type: Sequelize.STRING
      },
      accessibilityStatus: {
        type: Sequelize.STRING
      },
      trailSurface: {
        type: Sequelize.STRING
      },
      allowedTerraUse: {
        type: Sequelize.STRING
      },
      allowedSnowUse: { 
        type: Sequelize.STRING
      },
      allowedWaterUse: {
        type: Sequelize.STRING
      },
      typicalTrailGrade: {
        type: Sequelize.STRING
      },
      typicalTreadWidth: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trails');
  }
};