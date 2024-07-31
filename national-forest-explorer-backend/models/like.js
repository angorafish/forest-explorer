const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Like.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
    }
  }

  Like.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      modelName: "Like",
      tableName: "Likes",
      timestamps: true,
    }
  );

  return Like;
};