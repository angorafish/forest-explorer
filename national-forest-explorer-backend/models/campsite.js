const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Campsite extends Model {}

  Campsite.init({
    facility_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    map_url: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.TEXT,
    use_fee_description: DataTypes.TEXT,
    reservable: DataTypes.BOOLEAN,
    ada_access: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Campsite',
    tableName: 'Campsites',
    timestamps: false,
  });

  return Campsite;
};
