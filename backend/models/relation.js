'use strict';
const {
  Model
} = require('sequelize');
const { cpf } = require('cpf-cnpj-validator');
module.exports = (sequelize, DataTypes) => {
  class Relation extends Model {
    static associate(models) {
      Relation.belongsTo(models.Solicitation, { foreignKey: 'solicitationId'});
    }
  }
  Relation.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
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
    solicitationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Relation',
  });
  return Relation;
};