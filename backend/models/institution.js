'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Institution extends Model {
    static associate(models) {
      Institution.hasMany(models.User, { foreignKey: 'institutionId' });
      Institution.hasMany(models.Solicitation, { foreignKey: 'institutionId' });
    }
  }
  Institution.init({
    name: DataTypes.STRING,
    cnpj: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    dateRegister: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    validityPeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isIn: [['ATIVO','SUSPENSO']],
      },
    },
  }, {
    sequelize,
    modelName: 'Institution',
  });
  return Institution;
};