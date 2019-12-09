module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quotes', {
      stokabPriceId: {
        allowNull: true,
        type: Sequelize.UUID,
        primaryKey: true,
      },

      requestPriceId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
    });

    await queryInterface.addConstraint('quotes', ['stokabPriceId'], {
      name: 'fk_quotes_stokab_price',
      type: 'FOREIGN KEY',
      references: {
        table: 'stokab_price',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('quotes', ['requestPriceId'], {
      name: 'fk_quotes_price_request',
      type: 'FOREIGN KEY',
      references: {
        table: 'price_request',
        field: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('quotes');
  },
};
