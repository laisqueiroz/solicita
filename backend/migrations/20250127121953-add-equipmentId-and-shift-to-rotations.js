'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Rotations', 'equipmentId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Equipment', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('Rotations', 'shift', {
      type: Sequelize.ENUM('manhã', 'tarde', 'noite'),
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Rotations', 'equipmentId');
    await queryInterface.removeColumn('Rotations', 'shift');
  }
};
