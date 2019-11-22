module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('prod_category', 'logo_width', {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
      after: 'logo_url',
    });

    await queryInterface.addColumn('prod_category', 'logo_height', {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
      after: 'logo_width',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('prod_category', 'logo_width');
    await queryInterface.removeColumn('prod_category', 'logo_height');
  },
};
