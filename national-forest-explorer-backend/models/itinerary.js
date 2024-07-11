'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Itinerary extends Model {}

  Itinerary.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Itinerary',
    tableName: 'Itineraries',
    timestamps: true,
    underscored: false,
  });

  Itinerary.associate = function(models) {
    Itinerary.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Itinerary.hasMany(models.ItineraryItem, {
      foreignKey: 'itineraryId',
      as: 'items',
    });
  };

  return Itinerary;
};
