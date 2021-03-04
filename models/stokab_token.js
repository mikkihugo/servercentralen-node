module.exports = (sequelize, DataTypes) => {
  const StokabToken = sequelize.define('StokabToken', {
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
    tableName: 'stokab_token',
  });

  return StokabToken;
};
