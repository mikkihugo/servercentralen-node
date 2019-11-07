'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'resetPasswordToken', {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.STRING(50),
    });

    await queryInterface.addColumn('users', 'resetPasswordExpires', {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'resetPasswordToken');
    await queryInterface.removeColumn('users', 'resetPasswordExpires');
  },
};
