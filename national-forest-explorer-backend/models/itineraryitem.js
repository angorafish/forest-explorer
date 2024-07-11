const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ItineraryItem extends Model {}

  ItineraryItem.init({
    itineraryId: {
      type: DataTypes.INTEGER,
    },
    forestId: {
      type: DataTypes.INTEGER,
    },
    trailId: {
      type: DataTypes.INTEGER,
    },
    campsiteId: {
      type: DataTypes.INTEGER,
    },
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    note: DataTypes.STRING,
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
    modelName: 'ItineraryItem',
    tableName: 'ItineraryItems',
    timestamps: true,
    underscored: false,
  });

  ItineraryItem.associate = function(models) {
    ItineraryItem.belongsTo(models.Itinerary, { foreignKey: 'itineraryId' });
    ItineraryItem.belongsTo(models.Forest, { foreignKey: 'forestId' });
    ItineraryItem.belongsTo(models.Trail, { foreignKey: 'trailId' });
    ItineraryItem.belongsTo(models.Campsite, { foreignKey: 'campsiteId' });
  };

  return ItineraryItem;
};