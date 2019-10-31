require('dotenv').config();
const expressJwt = require('express-jwt');

const jwt = () => expressJwt({ secret: process.env.JWT_SECRET }).unless({
  path: [
    // public routes that don't require authentication
    '/api/auth',
    '/api/register',
  ],
});

module.exports = jwt;
