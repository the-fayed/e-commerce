const Category = require(`../../categories/model/categories.model`);
const Subcategory = require(`../../subcategories/model/subcategories.model`);
const Brand = require(`../../brands/model/brands.model`);
const Product = require(`../model/products.model`);

const { check } = require(`express-validator`);
const validatorMiddleware = require(`../../../common/middleware/validator.middleware`);
const slugify = require('slugify');

exports.createProductValidator = [
  check(`title`)
    .notEmpty()
    .withMessage(`Product name is required`)
    .isLength({ min: 2 })
    .withMessage(`Too short product name`)
    .isLength({ max: 100 })
    .withMessage(`Too long product name`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check(`description`)
    .notEmpty()
    .withMessage(`Product description is required`)
    .isLength({ max: 3200 })
    .withMessage(`Too long product description`),
  check(`price`).notEmpty().withMessage(`Product price is required`).isNumeric().withMessage(`Invalid product price`),
  check(`priceAfterDiscount`)
    .optional()
    .isNumeric()
    .withMessage(`Invalid price after discount`)
    .custom((value, { req }) => {
      if (value >= req.body.price)
        return Promise.reject(new Error(`Price after discount must be less than the actual price`));
    }),
  check(`quantity`)
    .notEmpty()
    .withMessage(`Product quantity is required`)
    .isNumeric()
    .withMessage(`Invalid product quantity`),
  check(`colors`).optional().isArray().withMessage(`Product available colors must be array of strings`),
  check(`sold`).optional().isNumeric().withMessage(`Invalid number of product sells`),
  check(`cover`).notEmpty().withMessage(`Product cover photo is required`),
  check(`images`).optional().isArray().withMessage(`Product images must be array of strings`),
  check(`category`)
    .notEmpty()
    .withMessage(`Category that the product belong to is required`)
    .isMongoId()
    .withMessage(`Invalid category id`)
    .custom((value) =>
      Category.findOne({ _id: value }).then((category) => {
        if (!category) return Promise.reject(new Error(`Category not found`));
      })
    ),
  check(`subcategories`)
    .optional()
    .isArray()
    .withMessage(`Subcategories must be an array of strings`)
    .custom((value) =>
      Subcategory.find({ _id: { $exists: true, $in: value } }).then((subcategories) => {
        if (!subcategories) return Promise.reject(new Error(`Subcategory/ies not found`));
      })
    )
    .custom((value, { req }) =>
      Subcategory.find({ category: req.body.category }).then((subcategories) => {
        const subcategoriesInDB = [];
        for (let subcategory in subcategories) {
          subcategoriesInDB.push(subcategories[subcategory]._id);
        }
        const checker = (target, array) => target.every((element) => array.includes(element));
        if (!checker(subcategoriesInDB, value))
          return Promise.reject(new Error(`Selected subcategory/ies not belong to the selected category`));
      })
    ),
  check(`brand`)
    .optional()
    .isMongoId()
    .withMessage(`Invalid brand id`)
    .custom((value) =>
      Brand.findOne({ _id: value }).then((brand) => {
        if (!brand) return Promise.reject(new Error(`Brand not found`));
      })
    ),
  check(`ratingsAverage`)
    .optional()
    .isNumeric()
    .withMessage(`Invalid Rating average value`)
    .isLength({ min: 1 })
    .withMessage(`Rating average can not be less than 1`)
    .isLength({ max: 5 })
    .withMessage(`Rating average can not be more than 5`),
  check(`ratingsQuantity`)
    .optional()
    .isNumeric()
    .withMessage(`Invalid rating quantity value`)
    .isLength({ min: 0 })
    .withMessage(`rating quantity can not be a negative value`),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Product id is required`)
    .isMongoId()
    .withMessage(`Invalid product id`)
    .custom((value) =>
      Product.findOne({ _id: value }).then((product) => {
        if (!product) return Promise.reject(new Error(`Product not found`));
      })
    ),
  check(`title`)
    .optional()
    .isLength({ min: 2 })
    .withMessage(`Too short product name`)
    .isLength({ max: 100 })
    .withMessage(`Too long product name`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check(`description`).optional().isLength({ max: 3200 }).withMessage(`Too long product description`),
  check(`price`).optional().isNumeric().withMessage(`Invalid product price`),
  check(`priceAfterDiscount`)
    .optional()
    .isNumeric()
    .withMessage(`Invalid price after discount`)
    .custom((value, { req }) => {
      if (value >= req.body.price)
        return Promise.reject(new Error(`Price after discount must be less than the actual price`));
    }),
  check(`quantity`).optional().isNumeric().withMessage(`Invalid product quantity`),
  check(`colors`).optional().isArray().withMessage(`Product available colors must be array of strings`),
  check(`sold`).optional().isNumeric().withMessage(`Invalid number of product sells`),
  check(`cover`).optional(),
  check(`images`).optional().isArray().withMessage(`Product images must be array of strings`),
  check(`category`)
    .optional()
    .isMongoId()
    .withMessage(`Invalid category id`)
    .custom((value) =>
      Category.findOne({ _id: value }).then((category) => {
        if (!category) return Promise.reject(new Error(`Category not found`));
      })
    ),
  check(`subcategories`)
    .optional()
    .isArray()
    .withMessage(`Subcategories must be an array of strings`)
    .custom((value) =>
      Subcategory.find({ _id: { $exists: true, $in: value } }).then((subcategories) => {
        if (!subcategories) return Promise.reject(new Error(`Subcategory/ies not found`));
      })
    )
    .custom((value, { req }) =>
      Subcategory.find({ category: req.body.category }).then((subcategories) => {
        const subcategoriesInDB = [];
        for (let subcategory in subcategories) {
          subcategoriesInDB.push(subcategories[subcategory]._id);
        }
        const checker = (target, array) => target.every((element) => array.includes(element));
        if (!checker(subcategoriesInDB, value))
          return Promise.reject(new Error(`Selected subcategory/ies not belong to the selected category`));
      })
    ),
  check(`brand`)
    .optional()
    .isMongoId()
    .withMessage(`Invalid brand id`)
    .custom((value) =>
      Brand.findOne({ _id: value }).then((brand) => {
        if (!brand) return Promise.reject(new Error(`Brand not found`));
      })
    ),
  check(`ratingsAverage`)
    .optional()
    .isNumeric()
    .withMessage(`Invalid Rating average value`)
    .isLength({ min: 1 })
    .withMessage(`Rating average can not be less than 1`)
    .isLength({ max: 5 })
    .withMessage(`Rating average can not be more than 5`),
  check(`ratingsQuantity`)
    .optional()
    .isNumeric()
    .withMessage(`Invalid rating quantity value`)
    .isLength({ min: 0 })
    .withMessage(`rating quantity can not be a negative value`),
  validatorMiddleware,
];

exports.getSpecificProductValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Product id is required`)
    .isMongoId()
    .withMessage(`Invalid product id`)
    .custom((value) =>
      Product.findOne({ _id: value }).then((product) => {
        if (!product) return Promise.reject(new Error(`Product not found`));
      })
    ),
    validatorMiddleware,
];

exports.deleteProductValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Product id is required`)
    .isMongoId()
    .withMessage(`Invalid product id`)
    .custom((value) =>
      Product.findOne({ _id: value }).then((product) => {
        if (!product) return Promise.reject(new Error(`Product not found`));
      })
    ),
  validatorMiddleware,
];
