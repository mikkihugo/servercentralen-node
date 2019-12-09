const initUserRouter = require('./user');
const initStokabRouter = require('./stokab');
const initCategoryRouter = require('./category');
const initPriceRouter = require('./price');

const initializeEndpoints = (app) => {
  initUserRouter(app);
  initStokabRouter(app);
  initCategoryRouter(app);
  initPriceRouter(app);
};

module.exports = initializeEndpoints;
