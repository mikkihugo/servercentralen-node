const corsRequestHandler = require('cors');
const bcrypt = require('bcrypt');

const constants = require('../constants');
const InputError = require('./input-error');

module.exports = {
  cors: corsRequestHandler({
    origin: constants.CORS_WHITE_LIST,
    // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Content-Length',
      'Content-Range',
      'Content-Disposition',
      'Content-Description',
      'Access-Control-Allow-Origin',
      'Access-Control-Request-Method',
      'Authorization',
      'Origin',
      'X-Requested-With',
      'X-AUTH-TOKEN',
    ],
  }),
  encryptPassword: async (password) => {
    if (!password) {
      throw Error('No password was provided.');
    }
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds, null);
  },
  comparePassword: async (password, hashedPassword) => bcrypt.compare(password, hashedPassword),
  validateAdminRole: (role) => {
    if (!role || !['admin'].includes(role.toLowerCase())) {
      throw new InputError('invalid permission');
    }
  },
};
