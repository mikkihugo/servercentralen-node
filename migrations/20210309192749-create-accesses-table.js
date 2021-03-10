module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('access', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      accessId: {
        allowNull: null,
        type: Sequelize.STRING,
      },
      legacyAccessId: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      streetName: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      streetNumber: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      streetLittera: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      postalCode: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      countryCode: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      premisesType: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      mduApartmentNumber: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      mduDistinguisher: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      population: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      accessState: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      coNetworkAgreement: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      coFiberConverter: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      coCpeSwitch: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      coCpeRouter: {
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
    await queryInterface.dropTable('access');
  },
};
