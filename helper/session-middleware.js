require('dotenv').config();
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const { User } = require('../models');

const sessionMiddleware = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const auth = req.headers.authorization.split(' ');
    const decoded = jwt.verify(auth[1], process.env.JWT_SECRET);
    const { id } = decoded;
    const user = id && await User.findOne({
      where: {
        id,
      },
    });

    if (user) {
      await user.update({
        lastLogin: new Date(),
      });

      req.user = user && _.omit(user.toJSON(), 'password');
    }
  }
  next();
};

module.exports = sessionMiddleware;
