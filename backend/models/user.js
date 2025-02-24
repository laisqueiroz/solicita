'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
     
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    cpf: {
      type: DataTypes.STRING,
      unique: true
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
      validate: {
        isIn: [['true','false']],
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};