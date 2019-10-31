const service = require('../service')

const initializeEndpoints = (app) => {
  app.options('/api/getByAddress', function(req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
    // res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD')
    res.send()
  })

  app.get('/api/getByAddress', async(req, res, next) => {
    const response = await service.fetchAddresses(encodeURIComponent(req.query.city), encodeURIComponent(req.query.street), encodeURIComponent(req.query.number))
    if (response.status) {
      return next(response)
    } else {
      return res.json(response)
    }
  })

  app.post('/api/auth', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // const response = await authService.auth({ email, password });
      return res.json({
        email,
        password
      });
    } catch (err) {
      return next(err);
    }
  });
}

module.exports = initializeEndpoints