const router = require("express").Router();

const { isAuthorized } = require("../../shared/middlewares/authorization.middleware");

const {
  addProductToWishlistHandler,
  removeProductFromWishlistHandler,
  getLoggedUserWishlistHandler,
} = require("./wishlists.controller");

const { ADD_PRODUCT_TO_WISHLIST, DELETE_PRODUCT_FROM_WISHLIST, GET_PRODUCTS_IN_WISHLIST } = require("./endpoints");

const {
  addProductToWishlistValidator,
  deleteProductFromWishlistValidator,
} = require("./wishlists.validator");

router
  .route("/")
  .post(isAuthorized(ADD_PRODUCT_TO_WISHLIST), addProductToWishlistValidator, addProductToWishlistHandler)
  .get(isAuthorized(GET_PRODUCTS_IN_WISHLIST), getLoggedUserWishlistHandler);

router.delete(
  "/:productId",
  isAuthorized(DELETE_PRODUCT_FROM_WISHLIST),
  deleteProductFromWishlistValidator,
  removeProductFromWishlistHandler
);

module.exports = router;
