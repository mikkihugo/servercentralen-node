module.exports = (sequelize, DataTypes) => {
  const StokabPrice = sequelize.define('StokabPrice', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    street: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    number: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    littera: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    postalCode: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    type: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    isRedundant: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isPremise: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    monthly: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    start: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    tableName: 'stokab_price',
  });

  return StokabPrice;
};
