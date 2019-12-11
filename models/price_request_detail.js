module.exports = (sequelize, DataTypes) => {
  const PriceRequestDetail = sequelize.define('PriceRequestDetail', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    requestId: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    type: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    speed: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    monthly: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    start: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    premises: {
      allowNull: true,
      type: DataTypes.INTEGER,
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
    tableName: 'price_request_detail',
  });

  PriceRequestDetail.associate = function (models) {
    PriceRequestDetail.belongsTo(models.PriceRequest, {
      foreignKey: 'requestId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      as: 'requestPrice',
    });
  };

  return PriceRequestDetail;
};
