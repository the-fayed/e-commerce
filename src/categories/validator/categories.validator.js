const { check } = require(`express-validator`);
const slugify = require('slugify');

const validationMiddleware = require(`../../../common/middleware/validator.middleware`);
const Category = require(`../model/categories.model`);

exports.createCategoryValidator = [
  check(`name`)
    .notEmpty()
    .withMessage(`Name is required`)
    .isLength({ min: 3 })
    .withMessage(`Too short category name`)
    .isLength({ max: 32 })
    .withMessage(`Too long category name`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validationMiddleware,
];

exports.getSpecificCategoryValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Category id is required`)
    .isMongoId()
    .withMessage(`Invalid category id`)
    .custom((value) =>
      Category.findOne({ _id: value }).then((category) => {
        if (!category) return Promise.reject(new Error(`Category not found`));
      })
    ),
  validationMiddleware,
];

exports.updateCategoryValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Category id is required`)
    .isMongoId()
    .withMessage(`Invalid category id`)
    .custom((value) =>
      Category.findOne({ _id: value }).then((category) => {
        if (!category) return Promise.reject(new Error(`Category not found`));
      })
    ),
  check(`name`)
    .optional()
    .isLength({ min: 3 })
    .withMessage(`Too short category name`)
    .isLength({ max: 32 })
    .withMessage(`Too long category name`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validationMiddleware,
];

exports.deleteCategoryValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Category id is required`)
    .isMongoId()
    .withMessage(`Invalid Category id`)
    .custom((value) =>
      Category.findOne({ _id: value }).then((category) => {
        if (!category) return Promise.reject(new Error(`Category not found`));
      })
    ),
  validationMiddleware,
];
