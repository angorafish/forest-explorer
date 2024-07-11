const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Forest extends Model {}

  Forest.init({
    admin_forest_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    region: DataTypes.STRING,
    forest_number: DataTypes.STRING,
    forest_org_code: DataTypes.STRING,
    name: DataTypes.STRING,
    gis_acres: DataTypes.FLOAT,
    shape_length: DataTypes.FLOAT,
    shape_area: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Forest',
    tableName: 'Forests',
    timestamps: true,
    underscored: true,
  });

  return Forest;
};
