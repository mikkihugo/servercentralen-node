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
}

module.exports = initializeUserEndpoints