/* eslint-disable no-console */
const authService = require('../services/auth.service');

const initializeUserEndpoints = (app) => {
  app.post('/api/register', async (req, res, next) => {
    console.log('/api/register');
    try {
      const response = await authService.register(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/auth', async (req, res, next) => {
    console.log('/api/auth');
    try {
      const { email, password } = req.body;
      const response = await authService.auth({ email, password });
      return res.json(response);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });

  app.put('/api/update_profile', async (req, res, next) => {
    console.log('/api/update_profile');
    try {
      const response = await authService.updateUser(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/forget_password', async (req, res, next) => {
    console.log('/api/forget_password');
    try {
      const response = await authService.sendResetEmail(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/reset_password', async (req, res, next) => {
    console.log('/api/reset_password');
    try {
      const response = await authService.resetPassword(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });
};

module.exports = initializeUserEndpoints;
