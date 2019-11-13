module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      prod_name: {
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
      userId: {
        allowNull: true,
        type: Sequelize.UUID,
        defaultValue: null,
      },
      categoryId: {
        allowNull: true,
        type: Sequelize.UUID,
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

    await queryInterface.addConstraint('products', ['userId'], {
      name: 'fk_products_users',
      type: 'FOREIGN KEY',
      references: {
        table: 'users',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('products', ['categoryId'], {
      name: 'fk_products_category',
      type: 'FOREIGN KEY',
      references: {
        table: 'prod_category',
        field: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};
