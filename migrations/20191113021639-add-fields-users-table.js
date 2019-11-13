module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'isActive', {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.BOOLEAN,
    });

    await queryInterface.addColumn('users', 'isClosed', {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'isActive');
    await queryInterface.removeColumn('users', 'isClosed');
  },
};
