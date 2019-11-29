const stokabService = require('../services/stokab.service');

const initializeStokabEndpoints = (app) => {
  app.get('/api/stokab/getAvailabilityByAddress', async (req, res, next) => {
    const response = await stokabService.fetchAvailabilityByAddress(
      encodeURIComponent(req.query.city),
      encodeURIComponent(req.query.street),
      encodeURIComponent(req.query.number),
    );
    if (response.status) {
      return next(response);
    }
    return res.json(response);
  });

  app.get('/api/stokab/getAvailabilityByPointId', async (req, res, next) => {
    const response = await stokabService.fetchAvailabilityByPointId(
      encodeURIComponent(req.query.pointId),
    );
    if (response.status) {
      return next(response);
    }
    return res.json(response);
  });

  app.get('/api/stokab/feasibility', async (req, res, next) => {
    const response = await stokabService.fetchFeasibilityAddress();
    if (response.status) {
      return next(response);
    }
    return res.json(response);
  });
};

module.exports = initializeStokabEndpoints;
