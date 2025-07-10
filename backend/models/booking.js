'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Rotation, { foreignKey: 'rotationId' });
      Booking.belongsTo(models.Solicitation, { foreignKey: 'solicitationId'});
    }
  }
  Booking.init({
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    rotationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    solicitationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};