const { check } = require("express-validator");

const Product = require("../products/products.model");
const Coupon = require("../coupons/coupons.model");
const validatorMiddleware = require("../../shared/middlewares/validator.middleware");

exports.addProductToCartValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id")
    .custom((value) => {
      return Product.findOne({ _id: value }).then((product) => {
        if (!product) return Promise.reject(new Error("Product not found"));
      });
    }),
  check("color")
    .optional()
    .isString()
    .withMessage("Invalid product color")
    .isLength({ max: 32 })
    .withMessage("Too long color"),
  check("size")
    .optional()
    .isString()
    .withMessage("Invalid Product.size")
    .isLength({ max: 10 })
    .withMessage("Too long product size"),
  validatorMiddleware,
];

exports.removeItemFromCartValidator = [
  check("itemId").notEmpty().withMessage("Item id is required").isMongoId().withMessage("Invalid item id"),
  validatorMiddleware,
];

exports.updateSpecificItemQuantityValidator = [
  check("itemId").notEmpty().withMessage("Item id is required").isMongoId().withMessage("Invalid item id"),
  check("quantity")
    .notEmpty()
    .withMessage("Item quantity is required")
    .isNumeric()
    .withMessage("Invalid item quantity"),
  validatorMiddleware,
];

exports.applyCouponValidator = [
  check("coupon")
    .notEmpty()
    .withMessage("Coupon name is required")
    .custom((value) => {
      return Coupon.findOne({ name: value }).then((coupon) => {
        if (!coupon) return Promise.reject(new Error("Invalid or expired coupon"));
      });
    }),
  validatorMiddleware,
];
