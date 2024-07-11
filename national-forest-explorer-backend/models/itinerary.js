'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Itinerary extends Model {}

  Itinerary.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Itinerary',
    tableName: 'Itineraries',
    timestamps: true,
    underscored: true,
  });

  Itinerary.associate = function(models) {
    Itinerary.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Itinerary.hasMany(models.ItineraryItem, {
      foreignKey: 'itinerary_id',
      as: 'items',
    });
  };

  return Itinerary;
};
