const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const User = require("../users/users.model");
const ApiError = require("../../shared/utils/api-error");

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist
// @access  Private (user)
exports.addProductToWishlistHandler = asyncHandler(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $addToSet: {
        wishlist: req.body.productId,
      },
    },
    { new: true }
  );
  if (!user) return next(new ApiError("Error while adding product to your wishlist", StatusCodes.NOT_MODIFIED));
  return res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "product added wishlist successfully", data: user.wishlist });
});

// @desc    Get all products in wishlist
// @route   GET /api/v1/wishlist
// @access  Private (user)
exports.getLoggedUserWishlistHandler = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id }).populate("wishlist");
  if (!user) return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.OK).json({ status: "success", results: user.wishlist.length, data: user.wishlist });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/v1/wishlist/:productId
// @access  Private (user)
exports.removeProductFromWishlistHandler = asyncHandler(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        wishlist: req.params.productId,
      },
    },
    { new: true }
  );
  if (!user) return next(new ApiError("Error while removing product from your wishlist", StatusCodes.NOT_MODIFIED));
  return res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "product removed from wishlist successfully", data: user.wishlist });
});
