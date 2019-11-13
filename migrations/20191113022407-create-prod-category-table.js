module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prod_category', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      category_name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      logo_url: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
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
    await queryInterface.dropTable('prod_category');
  },
};
