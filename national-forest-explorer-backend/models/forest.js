const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Forest extends Model {
    static associate(models) {
      Forest.hasMany(models.Post, {
        foreignKey: 'forestId',
        as: 'posts'
      });
      Forest.hasMany(models.Trail, {
        foreignKey: 'forestId',
        as: 'trails'
      });
    }
  }

  Forest.init({
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    adminForestId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    forestNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    forestOrgCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gisAcres: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    shapeLength: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    shapeArea: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Forest',
    tableName: 'Forests',
    timestamps: false,
    underscored: false,
  });

  return Forest;
};