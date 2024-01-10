const Review = require("./reviews.model");
const factory = require("../../shared/services/code.factor");

// setting req.filterObj to category id
exports.settingFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.productId) {
    filterObj = { product: req.params.productId };
    req.filterObj = filterObj;
  }
  next();
};

// @desc   Get all reviews
// @route  Get /api/v1/reviews
// @access Public
exports.getAllReviewsHandler = factory.findAllService(Review);

// @desc   Get specific review
// @route  Get /api/v1/reviews/:id
// @access Public
exports.getSpecificReviewHandler = factory.findOneService(Review);

// setting product id and user id to body
exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) {
    req.body.product = req.params.productId;
  }
  if (!req.body.user) {
    req.body.user = req.user._id;
  }
  next();
};

// @desc   Create review
// @route  POST /api/v1/review
// @access Privet
exports.createReviewHandler = factory.createService(Review);

// @desc   Update review
// @route  PUT /api/v1/review/:id
// @access Private
exports.updateReviewHandler = factory.updateService(Review);

// @desc   Delete review
// @route  DELETE /api/v1/review/:id
// @access Private
exports.deleteReviewHandler = factory.deleteService(Review);
