const { check } = require("express-validator");
const slugify = require(`slugify`);

const validatorMiddleware = require(`../../shared/middlewares/validator.middleware`);
const Subcategory = require(`./subcategories.model`);

exports.createSubcategoryValidator = [
  check(`name`)
    .notEmpty()
    .withMessage(`Subcategory name is required`)
    .isLength({ min: 2 })
    .withMessage(`Too short subcategory name`)
    .isLength({ max: 32 })
    .withMessage(`Too long subcategory name`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddleware,
];

exports.getSpecificSubcategoryValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Subcategory id is required`)
    .isMongoId()
    .withMessage(`Invalid product id`)
    .custom((value) =>
      Subcategory.findOne({ _id: value }).then((subcategory) => {
        if (!subcategory) return Promise.reject(new Error(`Subcategory not found`));
      })
    ),
  validatorMiddleware,
];

exports.updateSubcategoryValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Subcategory id is required`)
    .isMongoId()
    .withMessage(`Invalid subcategory id`)
    .custom((value) =>
      Subcategory.findOne({ _id: value }).then((subcategory) => {
        if (!subcategory) return Promise.reject(new Error(`Subcategory not found`));
      })
    ),
  check(`name`)
    .optional()
    .isLength({ min: 2 })
    .withMessage(`Too short subcategory name`)
    .isLength({ max: 32 })
    .withMessage(`Too long subcategory name`).custom((value, {req}) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check(`category`).optional().isMongoId().withMessage(`Invalid category id`),
  validatorMiddleware,
];

exports.deleteSubcategoryValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Subcategory id is required`)
    .isMongoId()
    .withMessage(`Invalid subcategory id`)
    .custom((value) =>
      Subcategory.findOne({ _id: value }).then((subcategory) => {
        if (!subcategory) return Promise.reject(new Error(`Subcategory not found`));
      })
    ),
  validatorMiddleware,
];
