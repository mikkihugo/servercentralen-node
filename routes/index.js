const initUserRouter = require('./user');
const initStokabRouter = require('./stokab');

const initializeEndpoints = (app) => {
  initUserRouter(app);
  initStokabRouter(app);
};

module.exports = initializeEndpoints;
