'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.User, { foreignKey: 'user_id' });
      Photo.belongsTo(models.Forest, { foreignKey: 'forest_id' });
      Photo.belongsTo(models.Trail, { foreignKey: 'trail_id' });
      Photo.belongsTo(models.Campsite, { foreignKey: 'campsite_id' });
      Photo.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }
  Photo.init({
    user_id: DataTypes.INTEGER,
    forest_id: DataTypes.INTEGER,
    trail_id: DataTypes.INTEGER,
    campsite_id: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};
