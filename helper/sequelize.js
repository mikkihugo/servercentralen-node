/* eslint-disable no-console */
const Umzug = require('umzug');
const path = require('path');

const db = require('../models');

const { sequelize, Sequelize } = db;

const checkForMigrations = () => {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize },
    migrations: { path: path.resolve('./', 'migrations') },
  });
  return umzug.pending();
};

const performMigrations = () => {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize },
    migrations: {
      path: path.resolve('./', 'migrations'),
      params: [sequelize.getQueryInterface(), Sequelize],
    },
    logging: console.log,
  });
  return umzug.up();
};

module.exports = {
  checkForMigrations,
  performMigrations,
};
