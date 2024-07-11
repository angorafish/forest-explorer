const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Photo extends Model {}

  Photo.init({
    user_id: DataTypes.INTEGER,
    forest_id: DataTypes.INTEGER,
    trail_id: DataTypes.INTEGER,
    campsite_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Photo',
    tableName: 'Photos',
    timestamps: true,
    underscored: true,
  });

  Photo.associate = function(models) {
    Photo.belongsTo(models.User, { foreignKey: 'user_id' });
    Photo.belongsTo(models.Forest, { foreignKey: 'forest_id' });
    Photo.belongsTo(models.Trail, { foreignKey: 'trail_id' });
    Photo.belongsTo(models.Campsite, { foreignKey: 'campsite_id' });
    Photo.belongsTo(models.Post, { foreignKey: 'postId' });
  };

  return Photo;
};
