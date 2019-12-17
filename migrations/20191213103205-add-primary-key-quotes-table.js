module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('quotes', 'id', {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('quotes', 'id');
  },
};
