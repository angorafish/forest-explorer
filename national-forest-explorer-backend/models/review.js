'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'user_id' });
      Review.belongsTo(models.Post, { foreignKey: 'postId' });
      Review.belongsTo(models.Forest, { foreignKey: 'forest_id' });
      Review.belongsTo(models.Trail, { foreignKey: 'trail_id' });
      Review.belongsTo(models.Campsite, { foreignKey: 'campsite_id' });
    }
  }
  Review.init({
    user_id: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    forest_id: DataTypes.INTEGER,
    trail_id: DataTypes.INTEGER,
    campsite_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
