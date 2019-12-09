module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stokab_price', {
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
      userId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      isRedundant: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isPremise: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    await queryInterface.addConstraint('stokab_price', ['userId'], {
      name: 'fk_stokab_price_users',
      type: 'FOREIGN KEY',
      references: {
        table: 'users',
        field: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('stokab_price');
  },
};
