'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        postType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        reviewText: {
            type: DataTypes.TEXT,
        },
        photos: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: true,
    });

    Post.associate = function(models) {
        Post.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'User'
        });
        Post.hasMany(models.Comment, {
            foreignKey: 'postId',
            as: 'Comments'
        });
        Post.hasMany(models.Review, {
            foreignKey: 'postId',
            as: 'Reviews'
        });
    };

    return Post;
};
