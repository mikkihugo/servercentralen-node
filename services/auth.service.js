require('dotenv').config();
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const InputError = require('../helper/input-error');
const constants = require('../constants');
const helper = require('../helper');
const { User } = require('../models');

const getToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET);

module.exports = {
  auth: async ({ email, password }) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      const isEqual = await helper.comparePassword(password, user.password);
      const token = getToken({ id: user.id, email: user.email });
      if (isEqual) {
        return {
          user: _.omit(user.toJSON(), 'password'),
          token,
        };
      }
    }
    throw new InputError('invalid email or password');
  },

  register: async (req) => {
    const {
      firstName, lastName, email, password, role = 'customer',
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      throw new InputError('invalid request');
    }

    if (!role || !constants.USER_ROLES.includes(role)) {
      throw new InputError('invalid role');
    }

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new InputError('email is already exist');
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
};
