'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trail extends Model {
    static associate(models) {
      Trail.belongsTo(models.Forest, { foreignKey: 'forest_id' });
      Trail.hasMany(models.Review, { foreignKey: 'trail_id' });
      Trail.hasMany(models.Photo, { foreignKey: 'trail_id' });
      Trail.hasMany(models.ItineraryItem, { foreignKey: 'trail_id' });
    }
  }
  Trail.init({
    forest_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    length: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    elevation: DataTypes.STRING,
    coordinates: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trail',
  });
  return Trail;
};
