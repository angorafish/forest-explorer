const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Post.hasMany(models.Comment, { foreignKey: "postId", as: "comments" });
      Post.hasMany(models.Review, { foreignKey: "postId", as: "reviews" });
      Post.hasMany(models.Like, { foreignKey: "postId", as: "likes" });
      Post.belongsTo(models.Forest, { foreignKey: "forestId", as: "forest" });
      Post.belongsTo(models.Trail, { foreignKey: "trailId", as: "trail" });
      Post.hasMany(models.Photo, { foreignKey: "postId", as: "photos" });
    }
  }

  Post.init(
    {
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
        defaultValue: 0,
      },
      reviewText: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      forestId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      trailId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "Posts",
      timestamps: true,
    }
  );

  return Post;
};
