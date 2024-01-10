const { check } = require("express-validator");

const validatorMiddleware = require("../../shared/middlewares/validator.middleware");
const Cart = require('../carts/carts.model');

exports.createOrderValidator = [
  check("cartId").notEmpty().withMessage("Cart id is required").isMongoId().withMessage("Invalid cart id"),
  check("shippingAddress")
    .optional()
    .isObject({
      details: String,
      city: String,
      phone: String,
      postalCode: String,
    })
    .withMessage("Invalid address"),
  validatorMiddleware,
];

exports.getSpecificOrderValidator = [
  check("id").notEmpty().withMessage("Order id is required").isMongoId().withMessage("Invalid order id"),
  validatorMiddleware,
];

exports.updateOrderStatusPaidValidator = [
  check("id").notEmpty().withMessage("Order id is required").isMongoId().withMessage("Invalid order id"),
  check("isPaid").notEmpty().withMessage('Please update the value').isBoolean().withMessage("Expected a boolean value"),
  validatorMiddleware,
];

exports.updateOrderStatusDeliveredValidator = [
  check("id").notEmpty().withMessage("Order id is required").isMongoId().withMessage("Invalid order id"),
  check("isDelivered").notEmpty().withMessage('Please update the value').isBoolean().withMessage("Expected a boolean value"),
  validatorMiddleware,
];

exports.checkoutSessionValidator = [
  check('cartId').notEmpty().withMessage('Cart id is required').isMongoId().withMessage('Invalid cart id').custom((value, {req}) => {
    return Cart.findOne({_id: value, user: req.user._id}).then((cart) => {
      if (!cart) return Promise.reject(new Error('Invalid cart id'));
    })
  }),
  check('shippingAddress').optional(),
  validatorMiddleware,
];
