const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class FriendRequest extends Model {
    static associate(models) {
      FriendRequest.belongsTo(models.User, { as: 'requester', foreignKey: 'requesterId' });
      FriendRequest.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId' });
    }
  }

  FriendRequest.init({
    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    }
  }, {
    sequelize,
    modelName: 'FriendRequest',
    tableName: 'FriendRequests',
    timestamps: true,
  });

  return FriendRequest;
};