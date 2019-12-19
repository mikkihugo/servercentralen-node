module.exports = (sequelize, DataTypes) => {
  const PriceRequest = sequelize.define('PriceRequest', {
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
    replyId: {
      allowNull: true,
      type: DataTypes.UUID,
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
    tableName: 'price_request',
  });

  PriceRequest.associate = function (models) {
    PriceRequest.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      as: 'requestUser',
    });

    PriceRequest.belongsTo(models.User, {
      foreignKey: 'replyId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      as: 'replyUser',
    });

    PriceRequest.hasMany(models.PriceRequestDetail, {
      foreignKey: 'requestId',
      as: 'requestDetailList',
    });

    PriceRequest.hasOne(models.Quotes, {
      foreignKey: 'requestPriceId',
      as: 'requestPrice',
    });
  };

  return PriceRequest;
};
