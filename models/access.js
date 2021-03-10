module.exports = (sequelize, DataTypes) => {
  const Access = sequelize.define('Access', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    accessId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    legacyAccessId: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    streetName: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    streetNumber: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    streetLittera: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    postalCode: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    countryCode: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    premisesType: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    mduApartmentNumber: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    mduDistinguisher: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    population: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    accessState: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    coNetworkAgreement: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    coFiberConverter: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    coCpeSwitch: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    coCpeRouter: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'Access',
  });

  return Access;
};
