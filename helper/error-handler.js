// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.name === 'InputError') {
    // custom application error
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    // authorization error
    return res.status(401).json({ message: 'Unauthorized token' });
  }

  if (err.code && err.code === 'ETIMEDOUT') {
    res
      .status(408)
      .send({
        status: 408,
        message: 'Timeout error'
      });
  }

  // default to 500 server error
  if (err && err.response) {
    return res.status(err.response.status).json({
      status: err.response.status,
      message: err.response.statusText,
    });
  }

  return res.status(500).json({
    status: 500,
    message: 'Service is unavailable',
  });
};

module.exports = errorHandler;
