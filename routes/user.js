const authService = require('../services/auth.service');

const initializeUserEndpoints = (app) => {
  app.post('/api/register', async (req, res, next) => {
    try {
      const response = await authService.register(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/auth', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const response = await authService.auth({ email, password });
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/api/me', async (req, res, next) => {
    try {
      return res.json({
        user: req.user,
      });
    } catch (err) {
      return next(err);
    }
  });

  app.put('/api/update_profile', async (req, res, next) => {
    try {
      const response = await authService.updateUser(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/forget_password', async (req, res, next) => {
    try {
      const response = await authService.sendResetEmail(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/reset_password', async (req, res, next) => {
    try {
      const response = await authService.resetPassword(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.delete('/api/account', async (req, res, next) => {
    try {
      const response = await authService.deleteAccount(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });
};

module.exports = initializeUserEndpoints;
