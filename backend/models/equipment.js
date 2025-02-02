'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Equipment.hasMany(models.Rotation, { foreignKey: 'equipmentId' });
    }
  }
  Equipment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Equipment',
  });
  return Equipment;
};