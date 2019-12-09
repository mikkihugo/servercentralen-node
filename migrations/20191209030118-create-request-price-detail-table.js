module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('price_request_detail', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      requestId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      speed: {
        allowNull: true,
        type: Sequelize.INTEGER(11),
        defaultValue: 0,
      },
      monthly: {
        allowNull: true,
        type: Sequelize.INTEGER(11),
        defaultValue: 0,
      },
      start: {
        allowNull: true,
        type: Sequelize.INTEGER(11),
        defaultValue: 0,
      },
      premises: {
        allowNull: true,
        type: Sequelize.INTEGER(11),
        defaultValue: 0,
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

    await queryInterface.addConstraint('price_request_detail', ['requestId'], {
      name: 'fk_price_request_detail',
      type: 'FOREIGN KEY',
      references: {
        table: 'price_request',
        field: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('price_request_detail');
  },
};
