const helper = require('../helper');

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
    }
  }, {
    hooks: {
      beforeCreate: beforeSaveHook,
      beforeUpdate: beforeSaveHook,
    },
  });

  // User.associate = function (models) {
  //   User.belongsToMany(models.Account, {
  //     through: models.AccountToUser,
  //     as: 'accounts',
  //   });
  // };

  return User;
};
