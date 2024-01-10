const asyncHandler = require(`express-async-handler`);
const { StatusCodes } = require(`http-status-codes`);
const jwt = require(`jsonwebtoken`);

const ApiError = require(`../utils/api.error`);
const User = require('../../modules/users/users.model');
const rbac = require('../rbac/rbac');

exports.isAuthorized = (endpoint) => {
return asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) next(new ApiError("You are not logged in, please login to pursued", StatusCodes.UNAUTHORIZED));
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // check if user exists on db
    const user = await User.findOne({ _id: decoded.id });
    if (!user) next(new ApiError('User not found', StatusCodes.UNAUTHORIZED));
    // check if user changed his password after init the token
    if (user.passwordChangedAt) {
      const passwordChangedAtTimeStamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
      if (passwordChangedAtTimeStamp > decoded.iat)
        next(new ApiError("Token Expired, please login again", StatusCodes.UNAUTHORIZED));
    }
    req.user = user;
    const isAuthorized = await rbac.can(user.role, endpoint);
    if (!isAuthorized) next(new ApiError('Unauthorized', StatusCodes.FORBIDDEN));
    next();
  } else {
    next(new ApiError('Unauthorized', StatusCodes.UNAUTHORIZED));
  }
})};
