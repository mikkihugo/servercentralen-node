require('dotenv').config();

const InputError = require('../helper/input-error');

const addressService = require('../services/address.service');
const openNetworkService = require('../services/openNetwork.service');
const stokabService = require('../services/stokab.service');

const initializeValidAPIEndpoints = (app) => {
  app.get('/api/address/autocomplete', async (req, res, next) => {
    try {
      const response = await addressService.getSuggestionList(req);

      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/api/address/price', async (req, res, next) => {
    const street = req.query.street;
    const streetNumber = req.query.streetNumber;
    const locality = req.query.locality;
    const postalCode = req.query.postalCode;

    // try {
    //   await addressService.getProviderPrice(street, streetNumber, locality, postalCode);
    // } catch (err) {
    //   return next(err);
    // }

    let accesses = null;
    let stokabAddresses = null;

    try {
      accesses = await openNetworkService.fetchAccessesByAddress(street, streetNumber, locality)
    } catch (err) {
      // console.log(err)
    }

    try {
      stokabAddresses = await stokabService.fetchAvailabilityByAddress(encodeURIComponent(locality), encodeURIComponent(street), encodeURIComponent(streetNumber))
    } catch (err) {
      // console.log(err)
    }

    if ((!accesses || accesses.count === 0) && (!stokabAddresses || stokabAddresses.length === 0)) {
      return next(new InputError('There is no available provider'));
    }
  });
};

module.exports = initializeValidAPIEndpoints;
