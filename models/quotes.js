module.exports = (sequelize, DataTypes) => {
  const Quotes = sequelize.define('Quotes', {
    stokabPriceId: {
      allowNull: true,
      primaryKey: true,
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
