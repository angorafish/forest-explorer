'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Forest extends Model {
        static associate(models) {
            Forest.hasMany(models.Trail, {
                foreignKey: 'forest_id',
                as: 'trails',
            });
            Forest.hasMany(models.Campsite, {
                foreignKey: 'forest_id',
                as: 'campsites',
            });
            Forest.hasMany(models.Photo, {
                foreignKey: 'forest_id',
                as: 'photos',
            });
            Forest.hasMany(models.Review, {
                foreignKey: 'forest_id',
                as: 'reviews',
            });
        }
    }
    Forest.init({
        name: DataTypes.STRING,
        location: DataTypes.STRING,
        size: DataTypes.STRING,
        description: DataTypes.STRING,
        history: DataTypes.STRING,
        flora_fauna: DataTypes.STRING,
        conservation_status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Forest',
    });
    return Forest;
};
