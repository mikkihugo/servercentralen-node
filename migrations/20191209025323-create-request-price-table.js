module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('price_request', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      street: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      number: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      littera: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      postalCode: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      replyId: {
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

    await queryInterface.addConstraint('price_request', ['replyId'], {
      name: 'fk_price_request_users',
      type: 'FOREIGN KEY',
      references: {
        table: 'users',
        field: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('price_request');
  },
};
