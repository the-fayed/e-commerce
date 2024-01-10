const { check } = require("express-validator");
const slugify = require("slugify");

const validatorMiddleware = require(`../../shared/middlewares/validator.middleware`);
const Brand = require(`./brands.model`);

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage(`Too short brand name`)
    .isLength({ max: 32 })
    .withMessage(`Too long brand name`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddleware,
];

exports.getSpecificBrandValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Brand id is required`)
    .isMongoId()
    .withMessage(`Invalid brand id`)
    .custom((value) =>
      Brand.findOne({ _id: value }).then((brand) => {
        if (!brand) return Promise.reject(new Error(`Brand not found`));
      })
    ),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Brand id is required`)
    .isMongoId()
    .withMessage(`Invalid brand id`)
    .custom((value) =>
      Brand.findOne({ _id: value }).then((brand) => {
        if (!brand) return Promise.reject(new Error(`Brand not found`));
      })
    ),
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage(`Too short brand name`)
    .isLength({ max: 32 })
    .withMessage(`Too long brand name`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check(`id`)
    .notEmpty()
    .withMessage(`Brand id is required`)
    .isMongoId()
    .withMessage(`Invalid brand id`)
    .custom((value) =>
      Brand.findOne({ _id: value }).then((brand) => {
        if (!brand) return Promise.reject(new Error(`Brand not found`));
      })
    ),
  validatorMiddleware,
];
