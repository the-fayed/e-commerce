const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const User = require("../../users/model/users.model");
const ApiError = require("../../../common/utils/api.error");

// @desc     Add user address
// @route    POST /api/v1/addresses
// @access   Privet (user)
exports.addUserAddressHandler = asyncHandler(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  if (!user) return next(new ApiError("Error while adding your address, please try again", StatusCodes.NOT_MODIFIED));
  return res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Your address has been added successfully", data: user.addresses });
});

// @desc     Get user address
// @route    Get /api/v1/address
// @access   Private (user)
exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id }).populate("addresses");
  if (!user) return next(new ApiError("Error while getting your address, please try again", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.OK).json({ status: "success", results: user.addresses.length, data: user.addresses });
});

// @desc     remove user address
// @route    DELETE /api/v1/address/:addressId
// @access   Private (user)
exports.removeUserAddressHandler = asyncHandler(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );
  if (!user) return next(new ApiError("Error while deleting your address, please try again", StatusCodes.NOT_MODIFIED));
  return res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Address deleted successfully", data: user.addresses });
});
