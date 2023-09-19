const router = require("express").Router();

const { isAuthorized } = require("../../../common/middleware/authorization.middleware");

const {
  getAllCouponsHandler,
  createNewCouponHandler,
  getSpecificCouponHandler,
  updateSpecificCouponHandler,
  deleteSpecificCouponHandler,
} = require("../controller/coupons.controller");

const {
  GET_ALL_COUPONS,
  CREATE_NEW_COUPON,
  GET_SPECIFIC_COUPON,
  UPDATE_COUPON,
  DELETE_COUPON,
} = require("../endpoints");
const { createNewCouponValidator, getSpecificCouponValidator, updateCouponValidator, deleteCouponValidator } = require('../validator/coupons.validator');

router
  .route("/")
  .get(isAuthorized(GET_ALL_COUPONS), getAllCouponsHandler)
  .post(isAuthorized(CREATE_NEW_COUPON), createNewCouponValidator, createNewCouponHandler);

router
  .route("/:id")
  .get(isAuthorized(GET_SPECIFIC_COUPON), getSpecificCouponValidator, getSpecificCouponHandler)
  .put(isAuthorized(UPDATE_COUPON), updateCouponValidator, updateSpecificCouponHandler)
  .delete(isAuthorized(DELETE_COUPON), deleteCouponValidator, deleteSpecificCouponHandler);

module.exports = router;
