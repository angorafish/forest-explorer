const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.User, { foreignKey: 'userId' });
      Photo.belongsTo(models.Forest, { foreignKey: 'forestId' });
      Photo.belongsTo(models.Trail, { foreignKey: 'trailId' });
      Photo.belongsTo(models.Campsite, { foreignKey: 'campsiteId' });
      Photo.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
    }
  }

  Photo.init({
    userId: {
      type: DataTypes.INTEGER,
    },
    forestId: {
      type: DataTypes.INTEGER,
    },
    trailId: {
      type: DataTypes.INTEGER,
    },
    campsiteId: {
      type: DataTypes.INTEGER,
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'Photo',
    tableName: 'Photos',
    timestamps: true,
  });

  return Photo;
};