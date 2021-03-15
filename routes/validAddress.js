require('dotenv').config();

const initializeValidAPIEndpoints = (app) => {
  app.get('/api/valid/autocomplete', async (req, res, next) => {
    try {
      // const response = await openNetworkService.getLastUpdated(req);
      return res.json({
        count: 2,
        rows: [
          { id: 1, value: 'Test value1' },
          { id: 2, value: 'Test value2' },
        ]
      });
    } catch (err) {
      return next(err);
    }
  });
};

module.exports = initializeValidAPIEndpoints;
