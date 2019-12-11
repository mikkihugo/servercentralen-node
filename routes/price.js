require('dotenv').config();

const priceService = require('../services/price.service');

const initializePriceEndpoints = (app) => {
  app.post('/api/stokab_price', async (req, res, next) => {
    try {
      const response = await priceService.addStokabPrice(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/request_price', async (req, res, next) => {
    try {
      const response = await priceService.addRequestPrice(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });
};

module.exports = initializePriceEndpoints;
