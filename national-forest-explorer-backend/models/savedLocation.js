const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SavedLocation extends Model {
    static associate(models) {
      SavedLocation.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      SavedLocation.belongsTo(models.Forest, { foreignKey: 'locationId', as: 'forest', constraints: false });
      SavedLocation.belongsTo(models.Trail, { foreignKey: 'locationId', as: 'trail', constraints: false });
    }
  }

  SavedLocation.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    locationType: {
      type: DataTypes.ENUM('forest', 'trail'),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'SavedLocation',
    tableName: 'SavedLocations',
    timestamps: true,
  });

  return SavedLocation;
};