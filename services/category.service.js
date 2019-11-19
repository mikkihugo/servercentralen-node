require('dotenv').config();
const Sequelize = require('sequelize');

const { ProdCategory } = require('../models');

const InputError = require('../helper/input-error');
const logger = require('../helper/logger');

const { Op } = Sequelize;

module.exports = {
  addCategory: async (req) => {
    const {
      categoryName, description, logoUrl,
    } = req.body;

    if (!categoryName) {
      logger.error({
        func: 'POST /api/category',
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    const existingCategory = await ProdCategory.findOne({
      where: {
        category_name: categoryName,
      },
    });

    if (existingCategory) {
      logger.error({
        func: 'POST /api/category',
        categoryName,
        message: 'Category with same name is already exist',
      });
      throw new InputError('Category with same name is already exist');
    }

    const newCategory = await ProdCategory.create({
      category_name: categoryName,
      description,
      logo_url: logoUrl,
    });

    logger.info({
      func: 'POST /api/category',
      user: newCategory,
    });

    return {
      category: newCategory,
    };
  },

  updateCategory: async (req) => {
    const categoryId = req.params.categoryId || '';
    if (!categoryId) {
      logger.error({
        func: 'PUT /api/category',
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    const {
      categoryName, description, logoUrl,
    } = req.body;

    if (!categoryName) {
      logger.error({
        func: 'PUT /api/category',
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    const existingCategory = await ProdCategory.findOne({
      where: {
        id: {
          [Op.not]: categoryId,
        },
        category_name: categoryName,
      },
    });

    if (existingCategory) {
      logger.error({
        func: 'PUT /api/category',
        categoryName,
        message: 'Category with same name is already exist',
      });
      throw new InputError('Category with same name is already exist');
    }

    const category = await ProdCategory.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      logger.error({
        func: 'PUT /api/category',
        id: categoryId,
        message: 'Invalid category id',
      });
      throw new InputError('Invalid category id');
    }

    const updatedCategory = await category.update({
      category_name: categoryName,
      description,
      logo_url: logoUrl,
    });

    logger.info({
      func: 'PUT /api/category',
      updatedCategory,
    });

    return {
      category: updatedCategory,
    };
  },
};
