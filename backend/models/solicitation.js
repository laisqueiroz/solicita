'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitation extends Model {
    static associate(models) {
      Solicitation.belongsTo(models.Equipment, { foreignKey: 'equipmentId' });
      Solicitation.belongsTo(models.Institution, { foreignKey: 'institutionId' });
      Solicitation.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Solicitation.init({
    code: {
        type: DataTypes.INTEGER,
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
            isIn:[['Estágio', 'Visita Técnica', 'Aula Prática', 'Ação de Extensão']],
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
        allowNull: false
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
    institutionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Institution',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    status: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Em análise','Deferido','Indeferido']],
        },
    }
  }, {
    sequelize,
    modelName: 'Solicitation',
  });
  return Solicitation;
};