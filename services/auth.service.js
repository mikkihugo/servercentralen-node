require('dotenv').config();
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const crypto = require('crypto');
const util = require('util');
const _ = require('lodash');

const InputError = require('../helper/input-error');
const mailProvider = require('../helper/mailProvider');
const logger = require('../helper/logger');
const constants = require('../constants');
const helper = require('../helper');
const { User } = require('../models');

const { Op } = Sequelize;

const PSW_RESET_TOKEN_VALID_FOR = 0.5; // 30 mins
const ONE_HOUR = 3600000;

const getToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET);

const cryptoRandomBytes = util.promisify(crypto.randomBytes);

const serializeUpdatedData = (rawData) => {
  const inputFields = [
    'firstName', 'lastName', 'email', 'streetAddress', 'city', 'country', 'postalCode', 'aboutMe',
  ];
  const updatedFields = {};

  Object.keys(rawData).forEach((key) => {
    if (rawData[key] !== undefined && inputFields.includes(key)) {
      updatedFields[key] = rawData[key];
    }
  });

  return updatedFields;
};

const createResetPswToken = async () => {
  const tokenBuffer = await cryptoRandomBytes(24);
  return tokenBuffer;
};

module.exports = {
  auth: async ({ email, password }) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      const isEqual = await helper.comparePassword(password, user.password);
      const token = getToken({ id: user.id });
      if (isEqual) {
        logger.info({
          func: 'POST /api/auth',
          user,
        });
        return {
          token,
        };
      }
    }
    logger.error({
      func: 'POST /api/auth',
      message: 'Invalid email or password',
    });
    throw new InputError('Invalid email or password');
  },

  register: async (req) => {
    const {
      firstName, lastName, email, password, role = 'customer',
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      logger.error({
        func: 'POST /api/register',
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    if (!role || !constants.USER_ROLES.includes(role)) {
      throw new InputError('Invalid role');
    }

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      logger.error({
        func: 'POST /api/register',
        email,
        message: 'Email is already exist',
      });
      throw new InputError('Email is already exist');
    }

    const newUser = await User.create({
      firstName, lastName, email, password, role,
    });

    const token = getToken({ id: newUser.id, email: newUser.email });
    logger.info({
      func: 'POST /api/register',
      user: newUser,
    });
    mailProvider.sendWelcomeEmail({ name: newUser.firstName, email: newUser.email });

    return {
      token,
    };
  },

  updateUser: async (req) => {
    const currentUser = req.user;

    const updatedData = serializeUpdatedData(req.body);
    const {
      firstName, lastName, email,
    } = updatedData;

    if (firstName === null || lastName === null || email === null) {
      logger.error({
        func: 'PUT /api/update_profile',
        firstName,
        lastName,
        email,
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    if (email) {
      const existingUser = await User.findOne({
        where: {
          id: {
            [Op.not]: currentUser.id,
          },
          email,
        },
      });

      if (existingUser) {
        logger.error({
          func: 'PUT /api/update_profile',
          email,
          message: 'Email already exists',
        });
        throw new InputError('Email already exists');
      }
    }

    const user = await User.findOne({
      where: {
        id: currentUser.id,
      },
    });

    if (!user) {
      logger.error({
        func: 'PUT /api/update_profile',
        id: currentUser.id,
        message: 'Invalid user id',
      });
      throw new InputError('Invalid user id');
    }

    const updatedUser = await user.update(updatedData);
    logger.info({
      func: 'PUT /api/update_profile',
      updatedUser,
    });
    return {
      user: updatedUser && _.omit(updatedUser.toJSON(), 'password'),
    };
  },

  sendResetEmail: async (req) => {
    const {
      email,
    } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      try {
        const resetPasswordToken = await createResetPswToken();
        user.resetPasswordToken = resetPasswordToken.toString('hex');
        user.resetPasswordExpires = new Date(Date.now() + (PSW_RESET_TOKEN_VALID_FOR * ONE_HOUR));

        await user.save();

        await mailProvider.sendResetPasswordLink({
          email,
          name: user.firstName,
          link: req.headers.host,
          token: user.resetPasswordToken,
        });

        logger.info({
          func: 'POST /api/forget_password',
          message: 'Sent email successfully.',
        });

        return {
          message: 'Sent email successfully.',
        };
      } catch (err) {
        logger.error({
          func: 'POST /api/forget_passwordrofile',
          err,
        });
        throw new InputError('There is an issue to send email.');
      }
    }
    logger.error({
      func: 'POST /api/forget_password',
      email,
      message: 'The email is not exist.',
    });
    throw new InputError('The email is not exist.');
  },

  resetPassword: async (req) => {
    const {
      password, token,
    } = req.body;

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() },
      },
    });

    if (user) {
      try {
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        user.password = password;

        await user.save();

        logger.info({
          func: 'POST /api/reset_password',
          message: 'Password is set successfully.',
        });

        return {
          message: 'Password is set successfully.',
        };
      } catch (err) {
        logger.error({
          func: 'POST /api/reset_password',
          err,
        });
        throw new InputError(err);
      }
    }
    throw new InputError('Invalid reset token.');
  },

  deleteAccount: async (req) => {
    try {
      User.destroy({ where: { id: req.user.id } });

      logger.info({
        func: 'DELETE /api/account',
        message: 'Account is removed successfully.',
      });

      return {
        message: 'Account is removed successfully.',
      };
    } catch (err) {
      logger.error({
        func: 'DELETE /api/account',
        err,
      });
      throw new InputError(err);
    }
  },
};
