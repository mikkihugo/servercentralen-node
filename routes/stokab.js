const service = require('../services');

const initializeStokabEndpoints = (app) => {
  // app.options('/api/getByAddress', function(req, res) {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
  //   // res.header('Access-Control-Allow-Credentials', true)
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD')
  //   res.send()
  // })

  app.get('/api/getByAddress', async (req, res, next) => {
    const response = await service.fetchAddresses(
      encodeURIComponent(req.query.city),
      encodeURIComponent(req.query.street),
      encodeURIComponent(req.query.number),
    );
    if (response.status) {
      return next(response);
    }
    return res.json(response);
  });
};

module.exports = initializeStokabEndpoints;
