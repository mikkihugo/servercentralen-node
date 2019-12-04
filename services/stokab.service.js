require('dotenv').config();
const axios = require('axios');
const qs = require('querystring');

const InputError = require('../helper/input-error');
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

const fetchAvailabilityByEstate = async (realestate, estatesuffix) => {
  const url = `${API_URL}/api/1.3/availability/GetByEstate?realestate=${realestate}&estatesuffix=${estatesuffix}`;
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

const priceEstimate = async (data) => {
  const url = `${API_URL}/api/1.3/priceEstimate`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios({
    method: 'POST',
    headers,
    url,
    data,
  });
  return response.data;
};

const offerInquiry = async (data) => {
  const url = `${API_URL}/api/1.3/offerInquiry`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios({
    method: 'POST',
    headers,
    url,
    data,
  });
  return response.data;
};

const fetchOfferInquiry = async (inquiryId) => {
  const url = `${API_URL}/api/1.3/offerInquiry/${inquiryId}`;
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

const order = async (data) => {
  const url = `${API_URL}/api/1.3/order`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios({
    method: 'POST',
    headers,
    url,
    data,
  });
  return response.data;
};

const fetchOrder = async (orderId) => {
  const url = `${API_URL}/api/1.3/order/${orderId}`;
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

const fetchInvoiceGroup = async () => {
  const url = `${API_URL}/api/1.3/invoiceGroup`;
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

const fetchFrameworkAgreement = async () => {
  const url = `${API_URL}/api/1.3/frameworkAgreement`;
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
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2QTFCNEExNTYwMTQyQUU5OTRCOTNBRjE1NUFGMjUxNjQ5MzUyMUUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJocUcwb1ZZQlFxNlpTNU92RlZyeVVXU1RVaDQifQ.eyJuYmYiOjE1NzU0Mjg2ODcsImV4cCI6MTU3NTQ0NTQ4NywiaXNzIjoiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UiLCJhdWQiOlsiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UvcmVzb3VyY2VzIiwiU3Rva2FiX2FwaSJdLCJjbGllbnRfaWQiOiJOU0MiLCJBY2NvdW50VXNlcklkIjoiNTU2NzY3LTY0NzIiLCJzY29wZSI6WyJTdG9rYWJfYXBpLmFjY2Vzc2xldmVsMyIsIlN0b2thYl9hcGkuYXV0aG9yaXR5Il19.SpUmOiGTRj22jCk2wb7apuBvBUGhFjdD26O07V4dk96sok7GQxM6Ecy1kZb6rmV-A54EJZEbHtTkCL8OH3_dI627yf9JlUFjeUNsdzJ_CmowNFjctI3jxtz5bgHq000qNGjhhtClr06OjNAO9UutHSUwMiSGoihhzgGs5SWdaI0xXumEBs61s6BP6aZXLWD6M5vCVtINuUAkqewc2VVynS0BF8lt_beVBTWrFjTCIuSkBjUGivdtMUyhRysVyIJE7qcEvyMeRpZ14DVAY3xX0cBvb3otfXOlV4uRyJGVurLsPQMb0rO6WiXek9wC-tUUzIVzexYYGFPUb-nzdbTsB8SYB2DZbjYuU70VDAdACXpCLYCe26BFbBKqgGFF2uPvrpkOkwtFkEXtTa-3BqvxbjhPtrfDayMmfbPPaJwYjaaU6VKXfpUA3F133Rq3_RXAKhfF-QCZvvyRs3A2rU_PtNDVERTVIBb4UgbblTM1w9QWRQ3kWgzDEVAR9YYC_cTl_jFGExwnydUbT7tA43Na6TboZjFYNueG-xyX-VBs5nO8XXUFK_zU-GyuB1nkulQMGXAsgtzBwySuOnrtBIIosDV3hJbYCglOeZFEWrNOl49GvYGxkWo7Gf0UeOnPDd2LzXPSqZ1k9EHnCpQtfD-2O5eyCgKrVhi6zQB49htBLNU';
  },

  fetchFeasibilityAddress: async () => {
    try {
      const response = await fetchFeasibilityAddress();
      logger.info({
        func: 'GET /api/stokab/feasibility',
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
        func: 'GET /api/stokab/feasibility',
        error,
      });
      return error.response.data || error.response;
    }
  },

  fetchAvailabilityByPointId: async (pointId) => {
    try {
      const response = await fetchAvailabilityByPointId(pointId);
      logger.info({
        func: 'GET /api/stokab/getAvailabilityByPointId',
        pointId,
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
        func: 'GET /api/stokab/getAvailabilityByPointId',
        pointId,
        error,
      });
      return error.response.data || error.response;
    }
  },

  fetchAvailabilityByEstate: async (realestate, estatesuffix) => {
    try {
      const response = await fetchAvailabilityByEstate(realestate, estatesuffix);
      logger.info({
        func: 'GET /api/stokab/getAvailabilityByEstate',
        realestate,
        estatesuffix,
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await fetchAvailabilityByEstate(realestate, estatesuffix);
        return response;
      }
      logger.error({
        func: 'GET /api/stokab/getAvailabilityByEstate',
        realestate,
        estatesuffix,
        error,
      });
      return error.response.data || error.response;
    }
  },

  fetchAvailabilityByAddress: async (city, street, number) => {
    try {
      const response = await fetchAvailabilityByAddress(city, street, number);
      logger.info({
        func: 'GET /api/stokab/getAvailabilityByAddress',
        city,
        street,
        number,
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
        func: 'GET /api/stokab/getAvailabilityByAddress',
        city,
        street,
        number,
        error,
      });
      return error.response.data || error.response;
    }
  },

  priceEstimate: async (req) => {
    const {
      invoiceGroupId, frameworkAgreementId, to, from, customerType, contractPeriodMonths, noOfSingleFibers, noOfFiberPairs,
    } = req.body;

    const data = {
      invoiceGroupId,
      frameworkAgreementId,
      to,
      from,
      customerType,
      contractPeriodMonths,
      noOfSingleFibers,
      noOfFiberPairs,
    };

    try {
      const response = await priceEstimate(data);
      logger.info({
        func: 'POST /api/stokab/priceEstimate',
        data,
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await priceEstimate(data);
        return response;
      }
      logger.error({
        func: 'POST /api/stokab/priceEstimate',
        data,
        error: error.response.data,
      });
      return error.response.data || error.response;
    }
  },

  offerInquiry: async (req) => {
    const {
      responsiblePersonEmail,
      invoiceGroupId,
      frameworkAgreementId,
      product,
      referenceId,
      from,
      to,
      comment,
      customerType,
      contractPeriodMonths,
      noOfSingleFibers,
      noOfFiberPairs,
      asyncAnswerAllowed,
    } = req.body;

    const data = {
      responsiblePersonEmail,
      invoiceGroupId,
      frameworkAgreementId,
      product,
      referenceId,
      from,
      to,
      comment,
      customerType,
      contractPeriodMonths,
      noOfSingleFibers,
      noOfFiberPairs,
      asyncAnswerAllowed,
    };

    try {
      const response = await offerInquiry(data);
      logger.info({
        func: 'POST /api/stokab/offerInquiry',
        data,
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await offerInquiry(data);
        return response;
      }
      logger.error({
        func: 'POST /api/stokab/offerInquiry',
        data,
        error: error.response.data,
      });
      return error.response.data || error.response;
    }
  },

  fetchOfferInquiry: async (inquiryId) => {
    if (!inquiryId) {
      logger.error({
        func: 'GET /api/stokab/offerInquiry',
        inquiryId,
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    try {
      const response = await fetchOfferInquiry(inquiryId);
      logger.info({
        func: 'GET /api/stokab/offerInquiry',
        inquiryId,
        response,
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await fetchOfferInquiry(inquiryId);
        return response;
      }
      logger.error({
        func: 'GET /api/stokab/offerInquiry',
        inquiryId,
        error: error.response.data,
      });
      return error.response.data || error.response;
    }
  },

  order: async (req) => {
    const {
      inquiryId,
      responsiblePersonEmail,
      invoiceReference,
      groupInvoiceBy,
      preferredDeliveryDate,
      endCustomer,
    } = req.body;

    const data = {
      inquiryId,
      responsiblePersonEmail,
      invoiceReference,
      groupInvoiceBy,
      preferredDeliveryDate,
      endCustomer,
    };

    try {
      const response = await order(data);
      logger.info({
        func: 'POST /api/stokab/order',
        data,
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await order(data);
        return response;
      }
      logger.error({
        func: 'POST /api/stokab/order',
        data,
        error: error.response.data,
      });
      return error.response.data || error.response;
    }
  },

  fetchOrder: async (orderId) => {
    if (!orderId) {
      logger.error({
        func: 'GET /api/stokab/order',
        orderId,
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    try {
      const response = await fetchOrder(orderId);
      logger.info({
        func: 'GET /api/stokab/order',
        orderId,
        response,
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await fetchOrder(orderId);
        return response;
      }
      logger.error({
        func: 'GET /api/stokab/order',
        orderId,
        error: error.response.data,
      });
      return error.response.data || error.response;
    }
  },

  fetchInvoiceGroup: async () => {
    try {
      const response = await fetchInvoiceGroup();
      logger.info({
        func: 'GET /api/stokab/invoiceGroup',
        response,
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await fetchInvoiceGroup();
        return response;
      }
      logger.error({
        func: 'GET /api/stokab/invoiceGroup',
        error: error.response.data,
      });
      return error.response.data || error.response;
    }
  },

  fetchFrameworkAgreement: async () => {
    try {
      const response = await fetchFrameworkAgreement();
      logger.info({
        func: 'GET /api/stokab/frameworkAgreement',
        response,
        message: 'Success',
      });
      return response;
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        await reCreateToken();
        const response = await fetchFrameworkAgreement();
        return response;
      }
      logger.error({
        func: 'GET /api/stokab/frameworkAgreement',
        error: error.response.data,
      });
      return error.response.data || error.response;
    }
  },
};
