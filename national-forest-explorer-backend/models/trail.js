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
    trailId: {
      type: DataTypes.STRING,
      unique: true,
      field: 'trailId',
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'createdAt',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updatedAt',
    },
  }, {
    sequelize,
    modelName: 'Trail',
    tableName: 'Trails',
    timestamps: true,
    underscored: false,
  });

  return Trail;
};