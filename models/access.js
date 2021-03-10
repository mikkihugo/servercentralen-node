module.exports = (sequelize, DataTypes) => {
  const Access = sequelize.define('Access', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    expires_in: {
      allowNull: false,
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
    tableName: 'Access',
  });

  return Access;
};
