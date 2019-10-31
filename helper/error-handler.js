const errorHandler = (err, req, res, next) => {
    if (err.name === 'InputError') {
      // custom application error
      return res.status(400).json({ message: err.message })
    }
    if (err.name === 'UnauthorizedError') {
      //authorization error
      return res.status(401).json({ message: 'invalid token' })
    }
    // default to 500 server error
    if (err && err.response) {
      return res.status(500).json({
        status: err.response.status,
        message: err.response.statusText
      })
    } else {
      return res.status(500).json({
        status: 500,
        message: 'Service is unavailable'
      })
    }
  };

  module.exports = errorHandler