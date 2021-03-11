require('dotenv').config();
const multer = require('multer');
var parse = require('csv-parse/lib/sync');
const fs = require('fs').promises;

const openNetworkService = require('../services/openNetwork.service');
const constants = require('../constants');
const upload = multer({ dest: constants.UPLOAD_TEMP_DIR });

const initializeOpenNetworkEndpoints = (app) => {
  app.post('/api/openNetwork/uploadCSV', upload.single('file'), async (req, res, next) => {
    try {
      if (!req.file || !req.body) {
        return next('invalid request');
      }

      const tempPath = req.file.path;
      const fileContent = await fs.readFile(tempPath, { encoding: 'utf-8' });

      const records = parse(fileContent, {columns: true, encoding: 'utf-8', quote: '`', delimiter: '|', escape: ' '});

      let count = 0
      if (records.length > 0) {
        count = await openNetworkService.uploadAccessCSV(req, records);
      }

      return res.json({
        success: true,
        count,
      });
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/openNetwork/updateAccesses', async (req, res, next) => {
    try {
      const response = await openNetworkService.updateAccesses(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/api/openNetwork/lastUpdated', async (req, res, next) => {
    try {
      const response = await openNetworkService.getLastUpdated(req);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/api/openNetwork/getAccessesByAddress', async (req, res, next) => {
    try {
      const response = await openNetworkService.fetchAccessesByAddress(req);

      if (response.status) {
        return next(response);
      }

      return res.json(response);
    } catch (err) {
      console.log(err)
      return next(err);
    }
  });
};

module.exports = initializeOpenNetworkEndpoints;
