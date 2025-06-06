'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate(models) {
      Equipment.hasMany(models.Rotation, { foreignKey: 'equipmentId' });
    }
  }
  Equipment.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toUpperCase()); 
      }
    }
  }, {
    sequelize,
    modelName: 'Equipment',
  });
  return Equipment;
};