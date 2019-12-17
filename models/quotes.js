module.exports = (sequelize, DataTypes) => {
  const Quotes = sequelize.define('Quotes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    stokabPriceId: {
      allowNull: true,
      type: DataTypes.UUID,
      defaultValue: null,
    },
    requestPriceId: {
      allowNull: true,
      type: DataTypes.UUID,
      defaultValue: null,
    },
  }, {
    tableName: 'quotes',
    timestamps: false,
  });

  return Quotes;
};
