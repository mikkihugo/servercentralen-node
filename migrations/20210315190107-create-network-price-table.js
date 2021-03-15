module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('network_price', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      network: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      speed: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      term: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        default: 0,
      },
      start: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        default: 0,
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
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('network_price');
  },
};
