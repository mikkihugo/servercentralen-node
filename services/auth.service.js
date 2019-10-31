require('dotenv').config();
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Sequelize = require('sequelize');

const InputError = require('../helper/input-error');
const constants = require('../constants');

const { User } = require('../models');

const { Op } = Sequelize;

const getToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET);

module.exports = {
  register: async (req) => {
    const {
      firstName, lastName, email, password, role = 'customer'
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
}