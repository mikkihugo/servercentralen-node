/* eslint-disable no-console */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Sequelize = require('sequelize');
const crypto = require('crypto');
const util = require('util');

const InputError = require('../helper/input-error');
const mailProvider = require('../helper/mailProvider');
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
        return {
          user: _.omit(user.toJSON(), 'password'),
          token,
        };
      }
    }
    throw new InputError('Invalid email or password');
  },

  register: async (req) => {
    const {
      firstName, lastName, email, password, role = 'customer',
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
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
      throw new InputError('Email is already exist');
    }

    const newUser = await User.create({
      firstName, lastName, email, password, role,
    });

    const token = getToken({ id: newUser.id, email: newUser.email });

    return {
      user: _.omit(newUser.toJSON(), 'password'),
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
        throw new InputError('Email already exists');
      }
    }

    const user = await User.findOne({
      where: {
        id: currentUser.id,
      },
    });

    if (!user) {
      throw new InputError('Invalid user id');
    }

    await user.update(updatedData);
    return {
      ..._.omit(user.toJSON(), 'password'),
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

        return {
          message: 'Sent email correctly',
        };
      } catch (err) {
        console.log(err);
        throw new InputError('There is an issue to send email.');
      }
    }
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

        return {
          message: 'Password is set successfully.',
        };
      } catch (err) {
        console.log(err);
      }
    }
    throw new InputError('Invalid reset token.');
  },
};
