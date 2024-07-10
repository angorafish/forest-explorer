'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Campsite extends Model {
        static associate(models) {
            Campsite.belongsTo(models.Forest, {
                foreignKey: 'forest_id',
                as: 'forest',
            });
            Campsite.hasMany(models.Photo, {
                foreignKey: 'campsite_id',
                as: 'photos',
            });
            Campsite.hasMany(models.Review, {
                foreignKey: 'campsite_id',
                as: 'reviews',
            });
        }
    }
    Campsite.init({
        forest_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        facilities: DataTypes.STRING,
        availability: DataTypes.STRING,
        coordinates: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Campsite',
    });
    return Campsite;
};
