'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate(models) {
      Equipment.hasMany(models.Department, { foreignKey: 'equipmentId' });
    }
  }
  Equipment.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toUpperCase()); 
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Equipment',
  });
  return Equipment;
};