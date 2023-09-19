const { check } = require("express-validator");

const validatorMiddleware = require("../../../common/middleware/validator.middleware");

exports.addTaxAndShipmentPricesValidator = [
  check("taxPrice")
    .notEmpty()
    .withMessage("Tax price is required")
    .isFloat()
    .withMessage("Invalid value for a price")
    .isLength({ max: 12 })
    .withMessage("Too long tax price value"),
  check("shipmentPrice")
    .notEmpty()
    .withMessage("Tax price is required")
    .isFloat()
    .withMessage("Invalid value for a price")
    .isLength({ max: 12 })
    .withMessage("Too long tax price value"),
  validatorMiddleware,
];

exports.updateTaxAndShipmentPricesValidator = [
  check("taxPrice")
    .optional()
    .isNumeric()
    .withMessage("Invalid value for a price")
    .isLength({ max: 12 })
    .withMessage("Too long tax price value"),
  check("shipmentPrice")
    .optional()
    .isNumeric()
    .withMessage("Invalid value for a price")
    .isLength({ max: 12 })
    .withMessage("Too long tax price value"),
  validatorMiddleware,
];