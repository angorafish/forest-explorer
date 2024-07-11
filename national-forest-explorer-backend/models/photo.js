const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Photo extends Model {}

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
    url: DataTypes.STRING,
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
    underscored: false,
  });

  Photo.associate = function(models) {
    Photo.belongsTo(models.User, { foreignKey: 'userId' });
    Photo.belongsTo(models.Forest, { foreignKey: 'forestId' });
    Photo.belongsTo(models.Trail, { foreignKey: 'trailId' });
    Photo.belongsTo(models.Campsite, { foreignKey: 'campsiteId' });
    Photo.belongsTo(models.Post, { foreignKey: 'postId' });
  };

  return Photo;
};