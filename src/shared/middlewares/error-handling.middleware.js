const { StatusCodes } = require("http-status-codes");

const ApiError = require("../utils/api-error");

exports.unhandledRoutesHandler = (req, res, next) => {
  next(new ApiError(`Route ${req.originalUrl} is not found`), StatusCodes.BAD_REQUEST);
};

const sendErrorOnDevMode = (error, res) =>
  res.status(error.statuscode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });

const sendErrorOnProdMode = (error, res) =>
  res.status(error.statuscode).json({
    status: error.status,
    message: error.message,
  });

const invalidJwtSignature = () => new ApiError("Invalid token, please login again", StatusCodes.UNAUTHORIZED);
const expiredToken = () => new ApiError("Expired token, please login again", StatusCodes.UNAUTHORIZED);

// eslint-disable-next-line no-unused-vars
exports.globalErrorHandler = (error, req, res, next) => {
  if (!error.statuscode) error.statuscode = 500;
  if (!error.status) error.status = `error`;
  if (process.env.NODE_ENV === `development`) {
    return sendErrorOnDevMode(error, res);
  } else {
    if (error.name === "JsonWebTokenError") error = invalidJwtSignature();
    if (error.name === "TokenExpiredError") error = expiredToken();
    return sendErrorOnProdMode(error, res);
  }
};
