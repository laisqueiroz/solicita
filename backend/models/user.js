'use strict';
const {
  Model
} = require('sequelize');
const { cpf } = require('cpf-cnpj-validator');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.belongsTo(models.Institution, { foreignKey: 'institutionId' });
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
      set(value) {
        this.setDataValue('email', value.toLowerCase()); 
      }
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
        isIn: [['admin','regular']],
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
        isIn: [['true','false']],
      },
    },
    dateBirth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    institutionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Institutions', 
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};