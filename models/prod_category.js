module.exports = (sequelize, DataTypes) => {
  const ProdCategory = sequelize.define('ProdCategory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    category_name: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: '',
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    logo_url: {
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
    tableName: 'prod_category',
  });

  return ProdCategory;
};
