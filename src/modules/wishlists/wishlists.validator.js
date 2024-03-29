const { check } = require("express-validator");

const validatorMiddleware = require("../../shared/middlewares/validator.middleware");
const Product = require("../products/products.model");

exports.addProductToWishlistValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id")
    .custom((value, { req }) => {
      return Product.findOne({ _id: value }).then((product) => {
        if (!product) {
          return Promise.reject(new Error("No product for this id"));
        }
        for (let item in req.user.wishlist) {
          if (req.user.wishlist[item]._id.toString() === product._id.toString()) {
            return Promise.reject(new Error("Product already in wishlist"));
          }
        }
      });
    }),
  validatorMiddleware,
];

exports.deleteProductFromWishlistValidator = [
  check("productId").notEmpty().withMessage("Product id is required").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware,
];
