const initUserRouter = require('./user');
const initStokabRouter = require('./stokab');
const initCategoryRouter = require('./category');
const initPriceRouter = require('./price');
const initializeOpenNetworkRouter = require('./openNetwork');
const initializeValidAPIEndpointsRouter = require('./address');

const initializeEndpoints = (app) => {
  initUserRouter(app);
  initStokabRouter(app);
  initCategoryRouter(app);
  initPriceRouter(app);
  initializeOpenNetworkRouter(app);
  initializeValidAPIEndpointsRouter(app);
};

module.exports = initializeEndpoints;
