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
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2QTFCNEExNTYwMTQyQUU5OTRCOTNBRjE1NUFGMjUxNjQ5MzUyMUUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJocUcwb1ZZQlFxNlpTNU92RlZyeVVXU1RVaDQifQ.eyJuYmYiOjE1NzI5MjQ4MDMsImV4cCI6MTU3Mjk0MTYwMywiaXNzIjoiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UiLCJhdWQiOlsiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UvcmVzb3VyY2VzIiwiU3Rva2FiX2FwaSJdLCJjbGllbnRfaWQiOiJOU0MiLCJBY2NvdW50VXNlcklkIjoiNTU2NzY3LTY0NzIiLCJzY29wZSI6WyJTdG9rYWJfYXBpLmFjY2Vzc2xldmVsMyIsIlN0b2thYl9hcGkuYXV0aG9yaXR5Il19.Q1iV4Q2Tk7kx5y3IauudhmPMtUj8mz0Dgjx0wkPhqmL92COdfkqk-FV_4iTT-f7AMitIbd1-qFfLIUTjj1zSVr2SmcI0gKbhT84qosx4jFGmWv_qRkujoHliRoexPhQMBvoyVvDBOZle9Ep3Oxg-KwgB5aS5Q7P7ra1uJ-Ycq01EgnvpiErn6TJb-JbJfqkPS9M7wPegU8d7ScCjbzIb71NPeK_yKz6PM6UPChHMpfx0MOVfVa6urys7plaoHHhYthn9Ls_j2VTVrHrTkiYs7TNzS8c7ZA-CbtF8JANZCjSGoEwqpY7FoUKzNkjQkhQ1Lzel-joaME05mAThQxcXnYxgJJr6e8FTPGsSZL-Z3XFJeGtsztVo5b_i02gm3M787s7J-PB4lwKFj4JzTytelU2V1eCMj4_XRgAUGjhWMnfh6KXcCTUVYEID-GvlgXvLCJQptZXLksiB_KfUvlDbG9m9kTCclvD7xrayQo6sixihI3BV0YFXv3Vm_ey8iWptgzcGT-sr_F8YX3p4UzdXUibuZhOqWVdP_Cap7v1Aj-Pz9Jc7uvuHSpXaCMLyVxuudepG4OwtZoNC0BXnV3P-miyKAXkPlnOR27hZ0NwLWPBP660DafwQ7adAId1ltKq7qWQNjyEjUeAAa4AZbITb90wnB2h6Uxh4OgQTcuBAmb4';
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
