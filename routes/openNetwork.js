require('dotenv').config();

const openNetworkService = require('../services/openNetwork.service');

const initializeOpenNetworkEndpoints = (app) => {
  app.post('/api/openNetwork/updateAccesses', async (req, res, next) => {
    try {
      const response = await openNetworkService.updateAccesses(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/api/openNetwork/getAccesses', async (req, res, next) => {
    try {
      const response = await openNetworkService.fetchAccessesByAddress(
        // encodeURIComponent(req.query.city),
        // encodeURIComponent(req.query.street),
        // encodeURIComponent(req.query.number),
        req
      );

      if (response.status) {
        return next(response);
      }

      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });
};

module.exports = initializeOpenNetworkEndpoints;
