'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      role: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      lastLogin: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
