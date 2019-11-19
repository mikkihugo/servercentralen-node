require('dotenv').config();
const path = require('path');
const multer = require('multer');
const constants = require('../constants');

const upload = multer({ dest: constants.UPLOAD_TEMP_DIR });

const fsPromises = require('../helper/fs-promise');

const initializeCategoryEndpoints = (app) => {
  app.post('/api/category/asset/', upload.single('file'), async (req, res, next) => {
    try {
      if (!req.file || !req.body) {
        return next('invalid request');
      }

      const mimeType = req.file.mimetype;
      const tempPath = req.file.path;
      if (mimeType.startsWith('image/')) {
        const ext = mimeType.split('/')[1].replace('jpeg', 'jpg');
        // check if dirs exist
        const categoryLogoAssetPath = path.join(__dirname, '../public/_category_assets');
        if (!await fsPromises.exists(categoryLogoAssetPath)) {
          await fsPromises.mkdir(categoryLogoAssetPath, '0755');
        }
        const timestamp = new Date().getTime();
        const filename = `${timestamp}.${ext}`;
        const targetPath = path.join(categoryLogoAssetPath, filename);

        await fsPromises.copyFile(tempPath, targetPath);

        const categoryLogoURL = `_category_assets/${filename}`;

        return res.json({
          success: true,
          logoUrl: categoryLogoURL,
        });
      }

      await fsPromises.unlink(tempPath);
      return next('invalid image format');
    } catch (err) {
      return next(err);
    }
  });
};

module.exports = initializeCategoryEndpoints;
