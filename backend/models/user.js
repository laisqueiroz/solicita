'use strict';
const {
  Model
} = require('sequelize');
const { cpf } = require('cpf-cnpj-validator');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.belongsTo(models.Institution, { foreignKey: 'institutionId' });
      User.hasMany(models.Solicitation, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      IsEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isValidCPF(value) {
          if (!cpf.isValid(value)) {
            throw new Error('CPF inválido!');
          }
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['ADMIN','REGULAR']],
      },
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['TRUE','FALSE']],
      },
    },
    dateBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    institutionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};