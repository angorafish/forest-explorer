'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Itinerary extends Model {
        static associate(models) {
            Itinerary.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });
            Itinerary.hasMany(models.ItineraryItem, {
                foreignKey: 'itinerary_id',
                as: 'items',
            });
        }
    }
    Itinerary.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Itinerary',
    });
    return Itinerary;
};
