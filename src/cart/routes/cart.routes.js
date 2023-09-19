const router = require("express").Router();

const { isAuthorized } = require("../../../common/middleware/authorization.middleware");

const {
  addProductToCartHandler,
  getLoggedUserCartHandler,
  removeItemFromCartHandler,
  clearLoggedUserCartHandler,
  updateSpecificItemQuantityHandler,
  applyCouponHandler,
} = require("../controller/cart.controller");

const {
  ADD_PRODUCT_TO_CART,
  GET_CART,
  REMOVE_ITEM_FORM_CART,
  CLEAR_CART,
  UPDATE_ITEM_QUANTITY,
  APPLY_COUPON,
} = require("../endpoints");

const {
  addProductToCartValidator,
  applyCouponValidator,
  updateSpecificItemQuantityValidator,
  removeItemFromCartValidator,
} = require("../validator/cart.validator");

router
  .route("/")
  .post(isAuthorized(ADD_PRODUCT_TO_CART), addProductToCartValidator, addProductToCartHandler)
  .get(isAuthorized(GET_CART), getLoggedUserCartHandler)
  .delete(isAuthorized(CLEAR_CART), clearLoggedUserCartHandler);

router.put("/applyCoupon", isAuthorized(APPLY_COUPON), applyCouponValidator, applyCouponHandler);

router
  .route("/:itemId")
  .put(isAuthorized(UPDATE_ITEM_QUANTITY), updateSpecificItemQuantityValidator, updateSpecificItemQuantityHandler)
  .delete(isAuthorized(REMOVE_ITEM_FORM_CART), removeItemFromCartValidator, removeItemFromCartHandler);

module.exports = router;
