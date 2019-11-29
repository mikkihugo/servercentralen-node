require('dotenv').config();
const axios = require('axios');
const qs = require('querystring');
const logger = require('../helper/logger');

const API_URL = 'https://TSD01.stokab.se';

let token = '';

const createToken = async () => {
  const url = `${API_URL}/connect/token`;
  const data = {
    grant_type: 'client_credentials',
    client_ID: process.env.CLIENT_ID,
    scope: process.env.SCOPE,
    client_secret: process.env.CLIENT_SECRET,
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios({
      method: 'POST',
      headers,
      data: qs.stringify(data),
      url,
    });
    token = response.data.access_token;
    logger.info({
      func: 'GET /api/getByAddress',
      message: `Token is created successfully - ${token}`,
    });
  } catch (error) {
    token = '';
    logger.info({
      func: 'GET /api/getByAddress',
      name: 'Create Token',
      status: error.response.status,
      message: error.response.message,
    });
  }
};

const fetchAvailabilityByAddress = async (city, street, number) => {
  const url = `${API_URL}/api/1.3/availability/GetByAddress?city=${city}&street=${street}&number=${number}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios({
    method: 'GET',
    headers,
    url,
  });
  return response.data;
};

const fetchAvailabilityByPointId = async (pointId) => {
  const url = `${API_URL}/api/1.3/availability/GetByPointId?pointId=${pointId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios({
    method: 'GET',
    headers,
    url,
  });
  return response.data;
};

const fetchFeasibilityAddress = async () => {
  const url = `${API_URL}/api/1.3/feasibility`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios({
    method: 'GET',
    headers,
    url,
  });
  return response.data;
};

const reCreateToken = async () => {
  await createToken();
  logger.info({
    func: 'GET /api/getByAddress',
    message: `Token is re-created successfully - ${token}`,
  });
};

module.exports = {
  getToken: async () => {
    // await createToken()
    // eslint-disable-next-line max-len
    // eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2QTFCNEExNTYwMTQyQUU5OTRCOTNBRjE1NUFGMjUxNjQ5MzUyMUUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJocUcwb1ZZQlFxNlpTNU92RlZyeVVXU1RVaDQifQ.eyJuYmYiOjE1NzI5MjQ4MDMsImV4cCI6MTU3Mjk0MTYwMywiaXNzIjoiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UiLCJhdWQiOlsiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UvcmVzb3VyY2VzIiwiU3Rva2FiX2FwaSJdLCJjbGllbnRfaWQiOiJOU0MiLCJBY2NvdW50VXNlcklkIjoiNTU2NzY3LTY0NzIiLCJzY29wZSI6WyJTdG9rYWJfYXBpLmFjY2Vzc2xldmVsMyIsIlN0b2thYl9hcGkuYXV0aG9yaXR5Il19.Q1iV4Q2Tk7kx5y3IauudhmPMtUj8mz0Dgjx0wkPhqmL92COdfkqk-FV_4iTT-f7AMitIbd1-qFfLIUTjj1zSVr2SmcI0gKbhT84qosx4jFGmWv_qRkujoHliRoexPhQMBvoyVvDBOZle9Ep3Oxg-KwgB5aS5Q7P7ra1uJ-Ycq01EgnvpiErn6TJb-JbJfqkPS9M7wPegU8d7ScCjbzIb71NPeK_yKz6PM6UPChHMpfx0MOVfVa6urys7plaoHHhYthn9Ls_j2VTVrHrTkiYs7TNzS8c7ZA-CbtF8JANZCjSGoEwqpY7FoUKzNkjQkhQ1Lzel-joaME05mAThQxcXnYxgJJr6e8FTPGsSZL-Z3XFJeGtsztVo5b_i02gm3M787s7J-PB4lwKFj4JzTytelU2V1eCMj4_XRgAUGjhWMnfh6KXcCTUVYEID-GvlgXvLCJQptZXLksiB_KfUvlDbG9m9kTCclvD7xrayQo6sixihI3BV0YFXv3Vm_ey8iWptgzcGT-sr_F8YX3p4UzdXUibuZhOqWVdP_Cap7v1Aj-Pz9Jc7uvuHSpXaCMLyVxuudepG4OwtZoNC0BXnV3P-miyKAXkPlnOR27hZ0NwLWPBP660DafwQ7adAId1ltKq7qWQNjyEjUeAAa4AZbITb90wnB2h6Uxh4OgQTcuBAmb4
    // eslint-disable-next-line max-len
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2QTFCNEExNTYwMTQyQUU5OTRCOTNBRjE1NUFGMjUxNjQ5MzUyMUUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJocUcwb1ZZQlFxNlpTNU92RlZyeVVXU1RVaDQifQ.eyJuYmYiOjE1NzQ5OTQxNTUsImV4cCI6MTU3NTAxMDk1NSwiaXNzIjoiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UiLCJhdWQiOlsiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UvcmVzb3VyY2VzIiwiU3Rva2FiX2FwaSJdLCJjbGllbnRfaWQiOiJOU0MiLCJBY2NvdW50VXNlcklkIjoiNTU2NzY3LTY0NzIiLCJzY29wZSI6WyJTdG9rYWJfYXBpLmFjY2Vzc2xldmVsMyIsIlN0b2thYl9hcGkuYXV0aG9yaXR5Il19.B0BcM3KT6WAhwqZgEtyqlzXZ7bn3CYnbuypUahIV_nXMZ2skwNrrNBPgDrc49iTuFM5cUbEfW_WpMubb7kjxF4pLJlnmB4pgS7J4w2nyp2S8yXWfuFkkVtc5-c9OyQO62JDxxn2odI9XAgqfmOJrB_dPuwyLI2o_c_FLKcZNrAor_DwkTh-6iZkXZsEIWFP9e_0M8UtjwBw-e0PLehT_V_Nfl2OKyeuo5PXViTwYpXUQNUG7WKUMLH964Nv7tHo_r-9bvyhmEo27FzoqwjKizPt2gqNghQvYD28InWuNK8xmcq8P8YjUpw_qtOr6V9KETe34HSlmS1WzklnJ5h7RuYqYJGZZJ_cKKzHEGIfr6knSA8VwVY8eCLs0Z6quOE8J_WAQ6xNveypVW7_D1xXQhq-fYJ2eZP703sTSu996k2zfNENGlCrlHc3piy1FnFKjy5e_TnulRDV61zE7dUBU7DiXwOLOTm-Y5vgA1m01_cCVJStOdV786UUk9Ijv6gDQOA9yIiFeGaFMTPFYww_koghnTvqNcobOaI6Hk-3XSWwiLgE3lBnLeHaMdVQPDHfmNahbF9Lr-XTUIVTY2N5nKMqoVdhiSPoFrP7FkeISOM-yK747BQsxOD6dnHhax01mBRfBkhTxm1o_F4Lq2pbyBhY50m7R9-yahUy5Rqelqdk';
  },

  fetchAvailabilityByAddress: async (city, street, number) => {
    try {
      const response = await fetchAvailabilityByAddress(city, street, number);
      logger.info({
        func: 'GET /api/getAvailabilityByAddress',
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await fetchAvailabilityByAddress(city, street, number);
        return response;
      }
      logger.error({
        func: 'GET /api/getAvailabilityByAddress',
        error,
      });
      return error.response;
    }
  },

  fetchAvailabilityByPointId: async (pointId) => {
    try {
      const response = await fetchAvailabilityByPointId(pointId);
      logger.info({
        func: 'GET /api/getAvailabilityByPointId',
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await fetchAvailabilityByPointId(pointId);
        return response;
      }
      logger.error({
        func: 'GET /api/getAvailabilityByPointId',
        error,
      });
      return error.response;
    }
  },

  fetchFeasibilityAddress: async () => {
    try {
      const response = await fetchFeasibilityAddress();
      logger.info({
        func: 'GET /api/feasibility',
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await fetchFeasibilityAddress();
        return response;
      }
      logger.error({
        func: 'GET /api/feasibility',
        error,
      });
      return error.response;
    }
  },
};
