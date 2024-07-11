const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Forest extends Model {}

  Forest.init({
    adminForestId: {
      type: DataTypes.STRING,
      unique: true,
      field: 'adminForestId',
    },
    region: {
      type: DataTypes.STRING,
      field: 'region',
    },
    forestNumber: {
      type: DataTypes.STRING,
      field: 'forestNumber',
    },
    forestOrgCode: {
      type: DataTypes.STRING,
      field: 'forestOrgCode',
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    gisAcres: {
      type: DataTypes.FLOAT,
      field: 'gisAcres',
    },
    shapeLength: {
      type: DataTypes.FLOAT,
      field: 'shapeLength',
    },
    shapeArea: {
      type: DataTypes.FLOAT,
      field: 'shapeArea',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'createdAt',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updatedAt',
    },
  }, {
    sequelize,
    modelName: 'Forest',
    tableName: 'Forests',
    timestamps: true,
    underscored: false,
  });

  return Forest;
};
