const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Trail extends Model {}

  Trail.init({
    trail_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    segment_length: DataTypes.FLOAT,
    managing_org: DataTypes.STRING,
    accessibility_status: DataTypes.STRING,
    trail_surface: DataTypes.STRING,
    allowed_terra_use: DataTypes.STRING,
    allowed_snow_use: DataTypes.STRING,
    typical_trail_grade: DataTypes.STRING,
    typical_tread_width: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Trail',
    tableName: 'Trails',
    timestamps: false,
  });

  return Trail;
};
