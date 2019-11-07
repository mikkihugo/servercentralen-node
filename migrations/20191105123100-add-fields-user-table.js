'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'streetAddress', {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('users', 'city', {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('users', 'country', {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('users', 'postalCode', {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('users', 'aboutMe', {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'streetAddress');
    await queryInterface.removeColumn('users', 'city');
    await queryInterface.removeColumn('users', 'country');
    await queryInterface.removeColumn('users', 'postalCode');
    await queryInterface.removeColumn('users', 'aboutMe');
  },
};
