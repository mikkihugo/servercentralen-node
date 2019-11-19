const initUserRouter = require('./user');
const initStokabRouter = require('./stokab');
const initCategoryRouter = require('./category');

const initializeEndpoints = (app) => {
  initUserRouter(app);
  initStokabRouter(app);
  initCategoryRouter(app);
};

module.exports = initializeEndpoints;
