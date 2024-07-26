Forest.init({
  adminForestId: {
    type: DataTypes.STRING,
    unique: true,
    field: 'adminForestId',
  },
  name: DataTypes.STRING,
  type: {
    type: DataTypes.STRING,
    defaultValue: 'forest'
  },
  region: DataTypes.STRING,
  gisAcres: DataTypes.FLOAT,
  forestNumber: DataTypes.STRING,
  forestOrgCode: DataTypes.STRING,
  shapeLength: DataTypes.FLOAT,
  shapeArea: DataTypes.FLOAT,
  description: {
    type: DataTypes.TEXT,
    defaultValue: 'No description available'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'createdAt',
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updatedAt',
  },
}, {
  sequelize,
  modelName: 'Forest',
  tableName: 'Forests',
  timestamps: true,
  underscored: false,
});