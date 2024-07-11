'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Review.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
      Review.belongsTo(models.Forest, { foreignKey: 'forest_id', as: 'forest' });
      Review.belongsTo(models.Trail, { foreignKey: 'trail_id', as: 'trail' });
      Review.belongsTo(models.Campsite, { foreignKey: 'campsite_id', as: 'campsite' });
    }
  }

  Review.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'postId',
    },
    forest_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'forest_id',
    },
    trail_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'trail_id',
    },
    campsite_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'campsite_id',
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt',
    },
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'Reviews',
    timestamps: true,
  });

  return Review;
};
