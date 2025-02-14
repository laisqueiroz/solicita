'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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