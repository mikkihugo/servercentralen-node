module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quotes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      stokabPriceId: {
        allowNull: true,
        type: Sequelize.UUID,
      },

      requestPriceId: {
        allowNull: true,
        type: Sequelize.UUID,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
