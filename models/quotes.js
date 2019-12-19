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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'quotes',
  });

  Quotes.associate = function (models) {
    Quotes.belongsTo(models.StokabPrice, {
      foreignKey: 'stokabPriceId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      as: 'stokabPrice',
    });

    Quotes.belongsTo(models.PriceRequest, {
      foreignKey: 'requestPriceId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      as: 'requestPrice',
    });
  };

  return Quotes;
};
