const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Trail extends Model {
    static associate(models) {
      Trail.hasMany(models.Post, {
        foreignKey: 'trailId',
        as: 'posts'
      });
    }
  }

  Trail.init({
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      defaultValue: 'trail'
    },
    forest: DataTypes.STRING,
    state: DataTypes.STRING,
    segmentLength: DataTypes.FLOAT,
    trailSurface: DataTypes.STRING,
    managingOrg: DataTypes.STRING,
    accessibilityStatus: DataTypes.STRING,
    allowedTerraUse: DataTypes.STRING,
    allowedSnowUse: DataTypes.STRING,
    allowedWaterUse: DataTypes.STRING,
    typicalTrailGrade: DataTypes.STRING,
    typicalTreadWidth: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Trail',
    tableName: 'Trails',
    timestamps: false,
    underscored: false,
  });

  return Trail;
};