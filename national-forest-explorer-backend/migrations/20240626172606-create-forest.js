"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Forests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      adminForestId: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      region: {
        type: Sequelize.STRING(50),
      },
      forestNumber: {
        type: Sequelize.STRING(50),
      },
      forestOrgCode: {
        type: Sequelize.STRING(50),
      },
      name: {
        type: Sequelize.STRING(255),
      },
      gisAcres: {
        type: Sequelize.DOUBLE,
      },
      shapeLength: {
        type: Sequelize.DOUBLE,
      },
      shapeArea: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Forests");
  },
};
