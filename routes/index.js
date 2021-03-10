const initUserRouter = require('./user');
const initStokabRouter = require('./stokab');
const initCategoryRouter = require('./category');
const initPriceRouter = require('./price');
const initializeOpenNetworkRouter = require('./openNetwork');

const initializeEndpoints = (app) => {
  initUserRouter(app);
  initStokabRouter(app);
  initCategoryRouter(app);
  initPriceRouter(app);
  initializeOpenNetworkRouter(app);
};

module.exports = initializeEndpoints;
