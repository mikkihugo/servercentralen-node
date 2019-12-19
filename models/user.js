const helper = require('../helper');

// eslint-disable-next-line no-unused-vars
const beforeSaveHook = async (user, options) => {
  if (user.password && user.changed('password')) {
    // eslint-disable-next-line no-param-reassign
    user.password = await helper.encryptPassword(user.password);
  }
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    role: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    lastLogin: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
    streetAddress: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    country: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    postalCode: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    aboutMe: {
      allowNull: true,
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    resetPasswordToken: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
    },
    resetPasswordExpires: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
    isActive: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isClosed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'users',
    hooks: {
      beforeCreate: beforeSaveHook,
      beforeUpdate: beforeSaveHook,
    },
  });

  User.associate = function (models) {
    User.hasMany(models.PriceRequest, {
      foreignKey: 'userId',
      as: 'requestPriceList',
    });

    User.hasMany(models.PriceRequest, {
      foreignKey: 'replyId',
      as: 'replyList',
    });

    User.hasMany(models.StokabPrice, {
      foreignKey: 'userId',
      as: 'stokabList',
    });
  };

  return User;
};
