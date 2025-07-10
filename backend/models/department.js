'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      Department.hasMany(models.Rotation, { foreignKey: 'departmentId' });
      Department.hasMany(models.Solicitation, { foreignKey: 'departmentId' });
      Department.belongsTo(models.Equipment, { foreignKey: 'equipmentId' });
    }
  }
  Department.init({
    nameDepartment: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    equipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};