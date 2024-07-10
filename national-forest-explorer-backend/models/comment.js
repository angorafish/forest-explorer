'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Comment.associate = function(models) {
        Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'User'
        });
        Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'Post'
        });
    };

    return Comment;
};
