const { check } = require("express-validator");

const Coupon = require("./coupons.model");
const validatorMiddleware = require("../../shared/middlewares/validator.middleware");

exports.createNewCouponValidator = [
  check("name")
    .notEmpty()
    .withMessage("Coupon name is required")
    .isLength({ max: 32 })
    .withMessage("Too long coupon name")
    .custom((value, { req }) => {
      return Coupon.findOne({ name: value.toUpperCase() }).then((coupon) => {
        if (coupon) return Promise.reject(new Error("Coupon already exists"));
        req.body.name = value.toUpperCase();
        return true;
      });
    }),
  check("expire")
    .notEmpty()
    .withMessage("Coupon expiration date is required")
    .isDate({
      format: "MM-DD-YYYY",
    })
    .withMessage("Invalid expiration date")
    .custom((value) => {
      if (value < Date.now()) {
        throw new Error("Coupon expiration date must be greater than today's date");
      }
      return true;
    }),
  check("discount")
    .notEmpty()
    .withMessage("Coupon discount amount is required")
    .isFloat()
    .withMessage("Invalid coupon discount amount"),
  validatorMiddleware,
];

exports.updateCouponValidator = [
  check("id")
    .notEmpty()
    .withMessage("Coupon id is required")
    .isMongoId()
    .withMessage("Invalid coupon id")
    .custom((value) => {
      return Coupon.findOne({ _id: value }).then((coupon) => {
        if (!coupon) return Promise.reject(new Error("Coupon not found"));
      });
    }),
  check("name")
    .optional()
    .isLength({ max: 32 })
    .withMessage("Too long coupon name")
    .custom((value, { req }) => {
      return Coupon.findOne({ name: value.ToUpperCase() }).then((coupon) => {
        if (coupon) return Promise.reject(new Error("Coupon already exists"));
        req.body.name = value.toUpperCase();
        return true;
      });
    }),
  check("expire")
    .optional()
    .isDate()
    .withMessage("Invalid expiration date")
    .custom((value) => {
      if (value.toString() < Date.now().toString()) {
        throw new Error("Coupon expiration date must be greater than today's date");
      }
      return true;
    }),
  check("discount").optional().isFloat().withMessage("Invalid coupon discount amount"),
  validatorMiddleware,
];

exports.getSpecificCouponValidator = [
  check("id")
    .notEmpty()
    .withMessage("Coupon id is required")
    .isMongoId()
    .withMessage("Invalid coupon id")
    .custom((value) => {
      return Coupon.findOne({ _id: value }).then((coupon) => {
        if (!coupon) return Promise.reject(new Error("Coupon not found"));
      });
    }),
  validatorMiddleware,
];

exports.deleteCouponValidator = [
  check("id")
    .notEmpty()
    .withMessage("Coupon id is required")
    .isMongoId()
    .withMessage("Invalid coupon id")
    .custom((value) => {
      return Coupon.findOne({ _id: value }).then((coupon) => {
        if (!coupon) return Promise.reject(new Error("Coupon not found"));
      });
    }),
  validatorMiddleware,
];
