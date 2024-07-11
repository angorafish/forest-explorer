const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ItineraryItem extends Model {}

  ItineraryItem.init({
    itinerary_id: DataTypes.INTEGER,
    forest_id: DataTypes.INTEGER,
    trail_id: DataTypes.INTEGER,
    campsite_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    note: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ItineraryItem',
    tableName: 'ItineraryItems',
    timestamps: true,
    underscored: true,
  });

  ItineraryItem.associate = function(models) {
    ItineraryItem.belongsTo(models.Itinerary, { foreignKey: 'itinerary_id' });
    ItineraryItem.belongsTo(models.Forest, { foreignKey: 'forest_id' });
    ItineraryItem.belongsTo(models.Trail, { foreignKey: 'trail_id' });
    ItineraryItem.belongsTo(models.Campsite, { foreignKey: 'campsite_id' });
  };

  return ItineraryItem;
};
