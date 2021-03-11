require('dotenv').config();
const axios = require('axios');
const Sequelize = require('sequelize');

const logger = require('../helper/logger');
const InputError = require('../helper/input-error');

const { sequelize, Access } = require('../models');

const OPEN_NETWORK_API_URL = 'https://ispportal.seom.se/api/onapi/2.4';

const fetchAllAccesses = async () => {
  const url = `${OPEN_NETWORK_API_URL}/accesses`;

  const response = await axios({
    method: 'GET',
    responseType: 'json',
    headers: {
      'content-type': 'application/json'
    },
    auth: {
      username: process.env.OPEN_NETWORK_USER_ID,
      password: process.env.OPEN_NETWORK_USER_PASSWORD,
    },
    url,
    maxContentLength: 1000000000,
    maxBodyLength: 1000000000,
  });

  return response.data;
};

module.exports = {
  uploadAccessCSV: async (req, records) => {
    const headerKey = Object.keys(records[0])[0]

    try {
      const headerKeys = headerKey.trim().split(';')
      let accesses = []

      for (const row of records) {
        const values = row[headerKey].split(';')

        let access = {}
        for (const [index, key] of Object.entries(headerKeys)) {
          const value = values[index]

          if (value.slice(0, 1) == '"' && value.slice(-1) == '"') {
            access[key] = value.slice(1, -1)
          } else {
            access[key] = values[index]
          }
        }

        accesses.push(access)
      }

      let count = 0
      const transaction = await sequelize.transaction()
      await Access.destroy({ truncate: true }, { transaction: transaction })

      while (accesses.length > 0) {
        const testData = accesses.splice(0, 5000);
        await Access.bulkCreate(testData, { transaction: transaction });

        count += testData.length
      }

      await transaction.commit();

      return count
    } catch (error) {
      logger.error({
        func: 'GET /api/openNetwork/uploadCSV',
        error,
      });
      console.log(error);
      throw error
    }
  },

  updateAccesses: async (req) => {
    try {
      const response = await fetchAllAccesses();

      logger.info({
        func: 'POST /api/openNetwork/update_accesses',
        message: 'get all access usign 3rd api',
        count: response.length,
        type: typeof response,
      });

      return response;
    } catch (error) {
      logger.error({
        func: 'GET /api/openNetwork/update_accesses',
        error,
      });

      throw error
    }
  },

  getLastUpdated: async (req) => {
    try {
      const access = await Access.findOne({
        order: [['createdAt', 'desc']]
      });

      return {
        lastUpdateDate: access && access.createdAt
      }
    } catch (err) {
      logger.error({
        func: 'GET /api/openNetwork/lastUpdated',
        error,
      });

      throw err
    }
  },

  fetchAccessesByAddress: async (req) => {
    try {
      const city = req.query.city;
      const street = req.query.street;
      const streetNumber = req.query.number;

      const {
        offset = 0, limit = 25,
      } = req.query;

      if (!city && !street && !streetNumber) {
        throw new InputError('Invalid request');
      }

      let queryCriteria = {};


      if (city) {
        queryCriteria.city = city
      }

      if (street) {
        queryCriteria.streetName = street
      }

      if (streetNumber) {
        queryCriteria.streetNumber = streetNumber
      }

      const query = {
        where: queryCriteria,
        offset: Number(offset || 0),
        limit: Number(limit || 25),
      };

      const accesses = await Access.findAndCountAll(query);

      return {
        offset: Number(offset || 0),
        count: accesses.count,
        rows: accesses.rows,
      };
    } catch (err) {
      logger.error({
        func: 'GET /api/openNetwork/getAccessesByAddress',
        err,
      });

      throw err
    }
  },
}