/* eslint-disable no-console */
const axios = require('axios');
const qs = require('querystring');

const API_URL = 'https://TSD01.stokab.se';

let token = '';

const createToken = async () => {
  const url = `${API_URL}/connect/token`;
  const data = {
    grant_type: 'client_credentials',
    client_ID: 'NSC',
    scope: 'Stokab_api.authority Stokab_api.accesslevel3',
    client_secret: 'G1HvQkRkQDqA6ULQnfP9RqqeHKS0zVAmZZxK1o+s8kM=',
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
    console.log(`Token is created successfully - ${token}`);
  } catch (error) {
    token = '';
    console.log(error.response.status);
  }
};

const fetchAddresses = async (city, street, number) => {
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

module.exports = {
  getToken: async () => {
    // await createToken()
    // eslint-disable-next-line max-len
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2QTFCNEExNTYwMTQyQUU5OTRCOTNBRjE1NUFGMjUxNjQ5MzUyMUUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJocUcwb1ZZQlFxNlpTNU92RlZyeVVXU1RVaDQifQ.eyJuYmYiOjE1NzI4ODk3MzIsImV4cCI6MTU3MjkwNjUzMiwiaXNzIjoiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UiLCJhdWQiOlsiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UvcmVzb3VyY2VzIiwiU3Rva2FiX2FwaSJdLCJjbGllbnRfaWQiOiJOU0MiLCJBY2NvdW50VXNlcklkIjoiNTU2NzY3LTY0NzIiLCJzY29wZSI6WyJTdG9rYWJfYXBpLmFjY2Vzc2xldmVsMyIsIlN0b2thYl9hcGkuYXV0aG9yaXR5Il19.ZHl_K9fxmAyaX0Kc3xHT-INO3mlgtIrnoUbCHjwxZ7DqU1hD6KfxIcloRgdeDmfMmX0cg4IboXr_8c2NqUL-qEhYH3MnbuD6TN0nsFKoRvhwoyS5BGMWgV9gdwaySv1FiEOUYeIUDBCGOU6zzfRZbXC96zayj9iqk-VbN--EN-8RITEfbRrdkC4IYAqnLLfpc7dZd1NGxsod5nRz1y-3Bq56mdZGdTthJRYyJTishpfn6nPsoQfRampTKM8Rex5dazpOjn-lKB3rVSHjmSBHFdIGA14fca0bocLbgGjsVbxoioUnOBMju5RONt_99xRMBHTjP7i7iQL2ZucmQYkmzF4BPVYJPzeTthIga_RIQiWkPLeMRG1fiwLNqHR7KEpLMBbX9z0oVfwpKmRULEtZZB7BqVUNJ8VhG9Wz9OrodNhX81b8GdK5ZIRH1aGHVuiOnOVI_cDuyZMVIi9FmBtsecXivb9Li1joCnU2tcOzfa2b8YNhCivBNXfO-MqtO2L2PxeYjL-I_9JhI2F2byCho3p6JZ_3RZxGXmvsjOXheMPgjPlMFina03yWZMP_gBR_5rfHuPVHLZS8MAPFIO3CiFCpyll-VDH10c7FVTl3rkGw6-YwcyI5riFij5JZbf7zt1caclGRsGtu4N0VA_AUEfND-H0FIENuDKRZhy1bllI';
  },

  fetchAddresses: async (city, street, number) => {
    try {
      const response = await fetchAddresses(city, street, number);
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await createToken();
        console.log('Token is re-created successfully');
        const response = await fetchAddresses(city, street, number);
        return response;
      }
      return error.response;
    }
  },
};
