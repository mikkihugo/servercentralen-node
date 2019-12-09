require('dotenv').config();

const { StokabPrice, Quotes } = require('../models');

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
        email: req.user.email,
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
};
