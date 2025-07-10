'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rotation extends Model {
    static associate(models) {
      Rotation.belongsTo(models.Department, { foreignKey: 'departmentId' });
      Rotation.hasMany(models.Booking, { foreignKey: 'rotationId' });
    }
  }
  Rotation.init({
    shift: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['MATUTINO','VESPERTINO','NOTURNO']],
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