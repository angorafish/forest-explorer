const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Campsite extends Model {
    static associate(models) {
      Campsite.hasMany(models.Post, {
        foreignKey: 'campsiteId',
        as: 'posts'
      });
    }
  }

  Campsite.init({
    facilityId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    mapUrl: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.TEXT,
    useFeeDescription: DataTypes.TEXT,
    reservable: DataTypes.BOOLEAN,
    adaAccess: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Campsite',
    tableName: 'Campsites',
    timestamps: true,
  });

  return Campsite;
};