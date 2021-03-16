require('dotenv').config();

const addressService = require('../services/address.service');

const initializeValidAPIEndpoints = (app) => {
  app.get('/api/address/autocomplete', async (req, res, next) => {
    try {
      const response = await addressService.getSuggestionList(req);

      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });
};

module.exports = initializeValidAPIEndpoints;
