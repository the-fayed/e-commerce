const router = require("express").Router({ mergeParams: true });

const {
  getAllReviewsHandler,
  createReviewHandler,
  getSpecificReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
  settingFilterObj,
  setProductIdAndUserIdToBody,
} = require("../controller/reviews.controller");

const {
  createReviewValidator,
  getSpecificReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../validator/reviews.validator");

const { isAuthorized } = require("../../../common/middleware/authorization.middleware");
const { CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } = require("../endpoints");

router
  .route("/")
  .get(settingFilterObj, getAllReviewsHandler)
  .post(isAuthorized(CREATE_REVIEW), setProductIdAndUserIdToBody, createReviewValidator, createReviewHandler);
router
  .route("/:id")
  .get(getSpecificReviewValidator, getSpecificReviewHandler)
  .put(isAuthorized(UPDATE_REVIEW), updateReviewValidator, updateReviewHandler)
  .delete(isAuthorized(DELETE_REVIEW), deleteReviewValidator, deleteReviewHandler);

module.exports = router;
