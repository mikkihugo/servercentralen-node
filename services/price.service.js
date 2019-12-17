require('dotenv').config();
const _ = require('lodash');

const {
  StokabPrice,
  Quotes,
  PriceRequest,
  PriceRequestDetail,
  User,
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

  getRequestPriceList: async (req) => {
    const currentUser = req.user;
    if (currentUser.role !== 'admin') {
      logger.error({
        func: 'GET /api/request_price',
        message: 'No permission!',
      });
      throw new InputError('No permission!');
    }

    const {
      offset = 0, limit = 25,
    } = req.query;

    const query = {
      offset: Number(offset || 0),
      limit: Number(limit || 25),
      order: [
        ['createdAt', 'desc'],
      ],
      include: [
        {
          model: User,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
          ],
          as: 'requestUser',
        },
        {
          model: User,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
          ],
          as: 'replyUser',
        },
      ],
    };

    try {
      const requestList = await PriceRequest.findAndCountAll(query);
      logger.info({
        func: 'POST /api/request_price',
        requestList,
      });
      return {
        offset: Number(offset || 0),
        count: requestList.count,
        rows: requestList.rows,
      };
    } catch (error) {
      logger.error({
        func: 'GET /api/request_price',
        error,
      });
      throw new InputError(error);
    }
  },

  getRequestPrice: async (req) => {
    const currentUser = req.user;
    if (currentUser.role !== 'admin') {
      logger.error({
        func: 'GET /api/request_price',
        message: 'No permission!',
      });
      throw new InputError('No permission!');
    }

    const requestId = req.params.requestId || '';

    if (!requestId) {
      logger.error({
        func: 'GET /api/request_price',
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    const query = {
      where: {
        id: requestId,
      },
      include: [
        {
          model: User,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
          ],
          as: 'requestUser',
        },
        {
          model: User,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
          ],
          as: 'replyUser',
        },
        {
          model: PriceRequestDetail,
          as: 'requestDetailList',
        },
      ],
    };

    try {
      const requestPrice = await PriceRequest.findOne(query);

      const orderDetailList = _.orderBy(requestPrice.requestDetailList, ['type', 'speed'], ['asc', 'asc']);
      const result = {
        ...requestPrice.toJSON(),
        requestDetailList: orderDetailList,
      };

      logger.info({
        func: 'GET /api/request_price',
        requestId,
        result,
      });

      return {
        requestPrice: result,
      };
    } catch (error) {
      logger.error({
        func: 'GET /api/request_price',
        requestId,
        error,
      });
      throw new InputError(error);
    }
  },

  replyRequestPrice: async (req) => {
    const {
      requestId, priceList,
    } = req.body;

    if (!requestId || !priceList || priceList.length === 0) {
      logger.error({
        func: 'POST /api/reply_request_price',
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    try {
      const priceRequest = await PriceRequest.findOne({
        where: {
          id: requestId,
        },
      });

      if (!priceRequest) {
        logger.error({
          func: 'POST /api/reply_request_price',
          requestId,
          message: 'Invalid request id',
        });
        throw new InputError('Invalid request id');
      }

      const updatedPriceRequest = await priceRequest.update({
        replyId: req.user.id,
      });

      PriceRequestDetail.bulkCreate(priceList, { updateOnDuplicate: ['id', 'start', 'monthly', 'premises'] });

      // const quote = await Quotes.findOne({
      //   where: {
      //     requestPriceId: requestId,
      //   },
      // });

      // if (!quote) {
      //   await Quotes.create({
      //     requestPriceId: requestId,
      //   });
      // }

      return {
        updatedPriceRequest,
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
