const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const User = require(`./users.model`);
const factory = require("../../shared/services/code-factor");
const ApiError = require("../../shared/utils/api-error");

// @desc   Create new user
// @route  POST /api/v1/users
// @access Privet (Admin)
exports.createUserHandler = factory.createService(User);

// @desc   Get specific user
// @route  GET /api/v1/users/:id
// @access Privet (Admin)
exports.getSpecificUserHandler = factory.findOneService(User);

// @desc   Get all users
// @route  GET /api/v1/users
// @access Privet (Admin)
exports.getAllUsersHandler = factory.findAllService(User);

// @desc   Update user
// @route  PUT /api/v1/users/:id
// @access Privet (Admin)
exports.updateUserHandler = factory.updateService(User);

// @desc   Update user password
// @route  PUT /api/v1/users/changePassword/:id
// @access Privet (Admin)
exports.updateUserPasswordHandler = factory.updateUserPasswordService(User);

// @desc   Delete specific user
// @route  DELETE /api/v1/users
// @access Privet (Admin)
exports.deleteUserHandler = factory.deleteService(User);

// @desc   Get logged user data
// @route  GET /api/v1/users/getMe
// @access Privet (User)
exports.getLoggedUserDataHandler = factory.handleUserRoutes();

// @desc   Update logged user data
// @route  Put /api/v1/users/updateLoggedUserData
// @access Privet (User)
exports.UpdateLoggedUserHandler = asyncHandler(async (req, res, next) => {
  const { name, slug, email, phone, avatar } = req.body;
  const updated = await User.findOneAndUpdate(
      req.user._id,
      { name: name, slug: slug, email: email, phone: phone, avatar: avatar },
      {new: true}
      );
  if (!updated) next(new ApiError("Error while updating data, please try again later"), StatusCodes.NOT_MODIFIED);
  res.status(StatusCodes.OK).json({ status: "success", data: updated });
});

// @desc   Change logged user password
// @route  Put /api/v1/users/changeLoggedUserPassword
// @access Privet (User)
exports.updateLoggedUserPasswordHandler = factory.handleUserRoutes();

// @desc   delete logged user
// @route  DELETE /api/v1/users/DeleteLoggedUser
// @access Privet (User)
exports.deleteLoggedUserHandler = factory.handleUserRoutes();
