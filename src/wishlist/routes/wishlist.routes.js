const router = require("express").Router();

const { isAuthorized } = require("../../../common/middleware/authorization.middleware");

const {
  addProductToWishlistHandler,
  removeProductFromWishlistHandler,
  getLoggedUserWishlistHandler,
} = require("../controller/wishlist.controller");

const { ADD_PRODUCT_TO_WISHLIST, DELETE_PRODUCT_FROM_WISHLIST, GET_PRODUCTS_IN_WISHLIST } = require("../endpoints");

const {
  addProductToWishlistValidator,
  deleteProductFromWishlistValidator,
} = require("../validator/wishlist.validator");

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
