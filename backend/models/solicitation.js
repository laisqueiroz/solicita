'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitation extends Model {
    static associate(models) {
      Solicitation.belongsTo(models.Equipment, { foreignKey: 'equipmentId' });
    }
  }
  Solicitation.init({
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    period: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modality: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            inIn:[['Estágio', 'Visita Técnica', 'Aula Prática', 'Ação de Extensão']],
        },
    },
    shift: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['manhã','tarde','noite']],
        },
    },
    relation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weekdays: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('weekdays') || '[]');
        },
        set(value) {
            this.setDataValue('weekdays', JSON.stringify(value));
        },
    },
    preceptorName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    councilRegistration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    equipmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Equipment',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
  }, {
    sequelize,
    modelName: 'Solicitation',
  });
  return Solicitation;
};