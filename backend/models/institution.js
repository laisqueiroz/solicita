'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Institution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Modality.hasMany(models.Solicitation, { foreignKey: 'modalityId' });
    }
  }
  Institution.init({
    name: DataTypes.STRING,
    cnpj: {
      type: DataTypes.STRING,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Institution',
  });
  return Institution;
};