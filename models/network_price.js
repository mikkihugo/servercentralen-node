module.exports = (sequelize, DataTypes) => {
  const NetworkPrice = sequelize.define('NetworkPrice', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    network: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    speed: {
      allowNull: false,
      type: DataTypes.INTEGER(11),
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER(11),
    },
    term: {
      allowNull: false,
      type: DataTypes.INTEGER(11),
      default: 0,
    },
    start: {
      allowNull: false,
      type: DataTypes.INTEGER(11),
      default: 0,
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
    tableName: 'network_price',
  });

  return NetworkPrice;
};
