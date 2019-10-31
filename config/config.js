const path = require('path');
const sequelize = require('sequelize');
require('dotenv').config();

// Example can be found here: https://github.com/sequelize/express-example
// Initialize database connection

// Declare which symbol based operators we will be using
// https://github.com/sequelize/sequelize/issues/8417
// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
const operatorsAliases = {
  $eq: sequelize.Op.eq,
  $ne: sequelize.Op.ne,
  $gt: sequelize.Op.gt,
  $lt: sequelize.Op.lt,
  $not: sequelize.Op.not,
  $notIn: sequelize.Op.notIn,
  $and: sequelize.Op.and,
  $or: sequelize.Op.or,
};

const config = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  operatorsAliases,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
  pool: {
    max: 100,
    min: 1,
    idle: 10000,
    acquire: 60000,
    evict: 10000,
  },
  logging: process.env.DB_LOGGING === 'true' ? console.log : undefined,
  freezeTableName: true, // By default, sequelize will pluralize model names
  timestamps: true,
  modelPaths: [path.resolve(__dirname, '..', 'models', '!(index.*)')],
};

module.exports = config;
