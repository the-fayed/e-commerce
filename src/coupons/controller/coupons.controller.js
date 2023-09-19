const Coupon = require ('../model/coupons.model');
const factory = require('../../../common/services/code.factor');


// @desc    Create new coupon
// @route   POST /api/v1/coupons
// @access  Privet (Admin)
exports.createNewCouponHandler = factory.createService(Coupon);

// @desc    Get all coupons
// @route   GET /api/v1/coupons
// @access  Privet (Admin)
exports.getAllCouponsHandler = factory.findAllService(Coupon);

// @desc    Get specific coupon
// @route   GET /api/v1/coupons/:id
// @access  Privet (Admin)
exports.getSpecificCouponHandler = factory.findOneService(Coupon);

// @desc    Update specific coupon
// @route   PUT /api/v1/coupons/:id
// @access  Privet (Admin)
exports.updateSpecificCouponHandler = factory.updateService(Coupon);

// @desc    Delete specific coupon
// @route   DELETE /api/v1/coupons/:id
// @access  Privet (Admin)
exports.deleteSpecificCouponHandler = factory.deleteService(Coupon);
