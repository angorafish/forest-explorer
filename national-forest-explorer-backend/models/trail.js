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
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    forest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segmentLength: DataTypes.DOUBLE,
    trailSurface: DataTypes.STRING,
    managingOrg: DataTypes.STRING,
    accessibilityStatus: DataTypes.STRING,
    allowedTerraUse: DataTypes.STRING,
    allowedSnowUse: DataTypes.STRING,
    allowedWaterUse: DataTypes.STRING,
    typicalTrailGrade: DataTypes.STRING,
    typicalTreadWidth: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      defaultValue: 'trail',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Trail',
    tableName: 'Trails',
    timestamps: true,
  });

  return Trail;
};