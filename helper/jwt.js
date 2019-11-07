require('dotenv').config();
const expressJwt = require('express-jwt');

const jwt = () => expressJwt({ secret: process.env.JWT_SECRET }).unless({
  path: [
    // public routes that don't require authentication
    '/api/auth',
    '/api/register',
    '/api/forget_password',
    '/api/reset_password',
  ],
});

module.exports = jwt;
