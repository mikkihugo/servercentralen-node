require('dotenv').config();
const axios = require('axios');

const logger = require('../helper/logger');

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

  fetchAccessesByAddress: async (req) => {
    // const currentUser = req.user;
    // if (currentUser.role !== 'admin') {
    //   logger.error({
    //     func: 'GET /api/user/list',
    //     message: 'No permission!',
    //   });
    //   throw new InputError('No permission!');
    // }

    const {
      offset = 0, limit = 25,
    } = req.query;

    // const query = {
    //   where: {
    //     role: 'user',
    //   },
    //   attributes: [
    //     'id',
    //     'firstName',
    //     'lastName',
    //     'email',
    //     'isActive',
    //     'isClosed',
    //     'role',
    //     'createdAt',
    //     'updatedAt',
    //   ],
    //   offset: Number(offset || 0),
    //   limit: Number(limit || 25),
    //   order: [
    //     [['firstName', 'asc'], ['lastName', 'asc']],
    //   ],
    //   distinct: true,
    // };

    // const users = await User.findAndCountAll(query);
    return {
      offset: Number(offset || 0),
      count: 2,
      rows: [],
    };
  },
}