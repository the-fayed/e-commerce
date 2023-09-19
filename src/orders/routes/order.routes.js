const router = require('express').Router();


const { isAuthorized } = require("../../../common/middleware/authorization.middleware");

const {
  createNewCashOrderHandler,
  getAllOrdersHandler,
  getSpecificOrderHandler,
  getSpecificOrderForLoggedUserHandler,
  createFilterObjForLoggedUser,
  updateOrderStatusDeliveredHandler,
  updateOrderStatusPaidHandler,
  checkoutSessionHandler,
} = require("../controller/order.controller");

const { CREATE_ORDER, GET_LOGGED_USER_ORDERS, UPDATE_ORDER, GET_ORDERS } = require("../endpoints");

const {
  createOrderValidator,
  getSpecificOrderValidator,
  updateOrderStatusPaidValidator,
  updateOrderStatusDeliveredValidator,
  checkoutSessionValidator,
} = require("../validator/orders.validator");

// @desc    stripe session
router.post("/checkout-session/:cartId", isAuthorized(CREATE_ORDER), checkoutSessionValidator, checkoutSessionHandler);

// @desc    User routes
router.post("/:cartId", isAuthorized(CREATE_ORDER), createOrderValidator, createNewCashOrderHandler);
router.get(
  "/:id",
  isAuthorized(GET_LOGGED_USER_ORDERS),
  getSpecificOrderValidator,
  getSpecificOrderForLoggedUserHandler
);

// @desc    Admin routes
router.route("/").get(isAuthorized(GET_ORDERS), createFilterObjForLoggedUser, getAllOrdersHandler);
router
  .route("/:id")
  .get(isAuthorized(GET_ORDERS), getSpecificOrderValidator, getSpecificOrderHandler)
  .put(isAuthorized(UPDATE_ORDER), updateOrderStatusDeliveredValidator, updateOrderStatusPaidHandler)
  .put(isAuthorized(UPDATE_ORDER), updateOrderStatusPaidValidator, updateOrderStatusDeliveredHandler);

module.exports = router;
