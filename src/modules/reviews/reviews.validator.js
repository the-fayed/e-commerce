const { check } = require("express-validator");

const validatorMiddleware = require("../../shared/middlewares/validator.middleware");
const Review = require("./reviews.model");

exports.createReviewValidator = [
  check("title").optional().isLength({ max: 320 }).withMessage("Too long review title"),
  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be a numeric value between 1.0 and 5.0"),
  check("user").notEmpty().withMessage("User id is required").isMongoId().withMessage("Invalid user id"),
  check("product")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id")
    .custom((value, { req }) => {
      return Review.findOne({ product: value, user: req.user._id }).then((review) => {
        if (review) {
          return Promise.reject(new Error('You already reviewed this product before'));
        }
      })
    }),
  validatorMiddleware,
];

exports.getSpecificReviewValidator = [
  check("id")
    .notEmpty()
    .withMessage("Review id is required")
    .isMongoId()
    .withMessage("Invalid review id")
    .custom((value) =>
      Review.findOne({ _id: value }).then((review) => {
        if (!review) {
          throw new Error("Review not found");
        }
        return true;
      })
    ),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id")
    .notEmpty()
    .withMessage("Review id is required")
    .isMongoId()
    .withMessage("Invalid review id")
    .custom((value, { req }) =>
      Review.findOne({ _id: value }).then((review) => {
        if (!review) {
          return Promise.reject(new Error("Review not found"));
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(new Error("Your not the owner of this review"));
        }
      })
    ),
  check("title").optional().isLength({ max: 320 }).withMessage("Too long review title"),
  check("rating").optional().isFloat({ min: 1, max: 5 }).withMessage("Rating rang is between 1.0 and 5.0"),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .notEmpty()
    .withMessage("Review id is required")
    .isMongoId()
    .withMessage("Invalid review id")
    .custom((value, { req }) => {
      return Review.findOne({ _id: value }).then((review) => {
        if (!review) {
          return Promise.reject(new Error("Review not found"));
        }
        if (req.user.role === "user") {
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(new Error("Your not the owner of this review"));
          }
        }
      });
    }),
  validatorMiddleware,
];
