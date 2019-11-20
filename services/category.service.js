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
      category: newCategory,
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

  deleteCategory: async (req) => {
    const categoryId = req.params.categoryId || '';

    const category = categoryId && await ProdCategory.findByPk(categoryId);
    if (!category) {
      logger.error({
        func: 'DELETE /api/category',
        id: categoryId,
        message: 'Invalid category id',
      });
      throw new InputError('invalid category id');
    }

    await category.destroy();

    logger.info({
      func: 'DELETE /api/category',
      id: categoryId,
      success: true,
    });

    return {
      success: true,
    };
  },

  fetchCategory: async (req) => {
    const {
      id,
    } = req.query;

    if (!id) {
      logger.error({
        func: 'GET /api/category',
        id,
        message: 'Invalid request',
      });
      throw new InputError('Invalid request');
    }

    const category = await ProdCategory.findOne({
      where: {
        id,
      },
    });

    if (category) {
      logger.info({
        func: 'GET /api/category',
        category,
      });

      return {
        category,
      };
    }

    logger.error({
      func: 'GET /api/category',
      message: 'Invalid category id',
    });
    throw new InputError('Invalid category id');
  },

  fetchCategories: async (req) => {
    const {
      offset = 0, limit = 25,
    } = req.query;

    const query = {
      attributes: [
        'id',
        'category_name',
        'description',
        'logo_url',
        'createdAt',
        'updatedAt',
      ],
      offset: Number(offset || 0),
      limit: Number(limit || 25),
      order: [
        ['category_name', 'asc'],
      ],
    };

    const categories = await ProdCategory.findAndCountAll(query);
    return {
      offset: Number(offset || 0),
      count: categories.count,
      rows: categories.rows,
    };
  },
};
