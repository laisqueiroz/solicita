'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rotation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rotation.init({
    name: DataTypes.STRING,
    vacant: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rotation',
  });
  return Rotation;
};