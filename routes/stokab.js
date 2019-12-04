const stokabService = require('../services/stokab.service');

const initializeStokabEndpoints = (app) => {
  app.get('/api/stokab/feasibility', async (req, res, next) => {
    const response = await stokabService.fetchFeasibilityAddress();
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

  app.get('/api/stokab/getAvailabilityByEstate', async (req, res, next) => {
    const response = await stokabService.fetchAvailabilityByEstate(
      encodeURIComponent(req.query.realestate),
      encodeURIComponent(req.query.estatesuffix),
    );
    if (response.status) {
      return next(response);
    }
    return res.json(response);
  });

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

  app.post('/api/stokab/priceEstimate', async (req, res, next) => {
    try {
      const response = await stokabService.priceEstimate(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/stokab/offerInquiry', async (req, res, next) => {
    try {
      const response = await stokabService.offerInquiry(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/api/stokab/offerInquiry/:inquiryId', async (req, res, next) => {
    try {
      const inquiryId = req.params.inquiryId || '';
      const response = await stokabService.fetchOfferInquiry(inquiryId);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/stokab/order', async (req, res, next) => {
    try {
      const response = await stokabService.order(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/api/stokab/order/:orderId', async (req, res, next) => {
    try {
      const orderId = req.params.orderId || '';
      const response = await stokabService.fetchOrder(orderId);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/api/stokab/invoiceGroup', async (req, res, next) => {
    try {
      const response = await stokabService.fetchInvoiceGroup();
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/api/stokab/frameworkAgreement', async (req, res, next) => {
    try {
      const response = await stokabService.fetchFrameworkAgreement();
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });
};

module.exports = initializeStokabEndpoints;
