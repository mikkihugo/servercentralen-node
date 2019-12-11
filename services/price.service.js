require('dotenv').config();

const {
  StokabPrice,
  Quotes,
  PriceRequest,
  PriceRequestDetail,
} = require('../models');

const InputError = require('../helper/input-error');
const logger = require('../helper/logger');

module.exports = {
  addStokabPrice: async (req) => {
    const {
      city, isPremise, isRedundant, littera, monthly, number, postalCode, start, street, type,
    } = req.body;

    if (!type) {
      logger.error({
        func: 'POST /api/stokab_price',
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    try {
      const newPrice = await StokabPrice.create({
        city,
        isPremise,
        isRedundant,
        littera,
        monthly,
        number,
        postalCode,
        start,
        street,
        type,
        userId: req.user.id,
      });

      logger.info({
        func: 'POST /api/stokab_price',
        price: newPrice,
      });

      await Quotes.create({
        stokabPriceId: newPrice.id,
      });

      return {
        price: newPrice,
      };
    } catch (err) {
      logger.error({
        func: 'POST /api/stokab_price',
        err,
      });
      throw new InputError('There is an issue to save stokab price.');
    }
  },

  addRequestPrice: async (req) => {
    const {
      city, littera, number, postalCode, street, basic, plus, premium,
    } = req.body;

    let speedLength = 0;
    speedLength += basic && basic.length;
    speedLength += plus && plus.length;
    speedLength += premium && premium.length;

    if (speedLength === 0) {
      logger.error({
        func: 'POST /api/request_price',
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    try {
      const requestPrice = await PriceRequest.create({
        city,
        littera,
        number,
        postalCode,
        street,
        userId: req.user.id,
      });

      logger.info({
        func: 'POST /api/request_price',
        price: requestPrice,
      });

      const requestDetail = [];
      if (basic) {
        basic.map((speed) => {
          requestDetail.push({ requestId: requestPrice.id, type: 'basic', speed: Number(speed) });
          return speed;
        });
      }

      if (plus) {
        plus.map((speed) => {
          requestDetail.push({ requestId: requestPrice.id, type: 'plus', speed: Number(speed) });
          return speed;
        });
      }

      if (premium) {
        premium.map((speed) => {
          requestDetail.push({ requestId: requestPrice.id, type: 'premium', speed: Number(speed) });
          return speed;
        });
      }

      await PriceRequestDetail.bulkCreate(requestDetail);

      return {
        requestPrice,
      };
    } catch (err) {
      logger.error({
        func: 'POST /api/request_price',
        err,
      });
      throw new InputError('There is an issue to save request price.');
    }
  },
};
