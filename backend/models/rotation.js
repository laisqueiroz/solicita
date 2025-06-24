'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rotation extends Model {
    static associate(models) {
      Rotation.belongsTo(models.Department, { foreignKey: 'departmentId' });
    }
  }
  Rotation.init({
    shift: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['matutino','vespertino','noturno']],
      },
    },
    vacant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Rotation',
  });
  return Rotation;
};