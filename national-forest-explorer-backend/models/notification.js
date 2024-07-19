const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Notification.belongsTo(models.User, { foreignKey: 'fromUserId', as: 'fromUser' });
    }
  }

  Notification.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fromUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unread',
    },
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'Notifications',
    timestamps: true,
  });

  return Notification;
};