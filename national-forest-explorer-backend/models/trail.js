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
    name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    type: {
      type: DataTypes.STRING,
      field: 'type',
    },
    segmentLength: {
      type: DataTypes.FLOAT,
      field: 'segmentLength',
    },
    managingOrg: {
      type: DataTypes.STRING,
      field: 'managingOrg',
    },
    accessibilityStatus: {
      type: DataTypes.STRING,
      field: 'accessibilityStatus',
    },
    trailSurface: {
      type: DataTypes.STRING,
      field: 'trailSurface',
    },
    allowedTerraUse: {
      type: DataTypes.STRING,
      field: 'allowedTerraUse',
    },
    allowedSnowUse: {
      type: DataTypes.STRING,
      field: 'allowedSnowUse',
    },
    allowedWaterUse: {
      type: DataTypes.STRING,
      field: 'allowedWaterUse',
    },
    typicalTrailGrade: {
      type: DataTypes.STRING,
      field: 'typicalTrailGrade',
    },
    typicalTreadWidth: {
      type: DataTypes.STRING,
      field: 'typicalTreadWidth',
    },
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