require('dotenv').config();
const axios = require('axios');

const logger = require('../helper/logger');
const InputError = require('../helper/input-error');

const VALID_API_URL = 'https://valid.geposit.se/1.7';

const fetchSuggestionAddresses = async (query) => {
  const url = `${VALID_API_URL}/suggest/address/se?api_key=${process.env.VALID_API_KEY}&response_format=json&query=${query}&columns=street,locality,postalcode`;
  const response = await axios({
    method: 'GET',
    responseType: 'json',
    headers: {
      'content-type': 'application/json'
    },
    url,
  });

  return response.data;
};

module.exports = {
  getSuggestionList: async (req) => {
    const query = req.query.query;

    if (!query) {
      logger.error({
        func: 'GET /api/address/autocomplete',
        message: 'Invalid request',
      });
      throw new InputError('Query param is required');
    }

    try {
      const response = await fetchSuggestionAddresses(query);

      logger.info({
        func: 'GET /api/address/autocomplete',
        query,
        count: response.suggestions.length,
      });

      return {
        count: response.suggestions.length,
        rows: response.suggestions,
      };
    } catch (err) {
      logger.error({
        func: 'GET /api/address/autocomplete',
        query,
        err,
      });

      throw err
    }
  },
}