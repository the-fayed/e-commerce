const asyncHandler = require(`express-async-handler`);
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

const User = require(`../users/users.model`);
const ApiError = require("../../shared/utils/api.error");
const { generateToken } = require("../../shared/services/code.factor");
const sendEmail = require("../../shared/services/send.email");
const emailTemplates = require("../../shared/templs/email.templates");
const factory = require("../../shared/services/code.factor");

// @desc   Signup
// @route  POST /api/v1/auth/signup
// @access Public
exports.signupHandler = asyncHandler(async (req, res) => {
  const { name, password, email, phone, avatar, slug } = req.body;
  const user = await User.create({
    name,
    password,
    email,
    phone,
    avatar,
    slug,
    verifyEmailToken: factory.generateEmailVerificationToken(),
  });
  await sendEmail(user.email, "Email Verification", emailTemplates.verifyUserEmail(user.verifyEmailToken));
  res
    .status(StatusCodes.CREATED)
    .json({ status: `success`, message: "A verification email sent to you, please check your email." });
});

// @desc   Login
// @route  POST /api/v1/auth/login
// @access Public
exports.loginHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const isMatched = await bcrypt.compare(password, user.password);
  if (!user || !isMatched) return next(new ApiError("Email and password does not match", StatusCodes.FORBIDDEN));
  if (user.emailVerified === false) {
    if (user.verifyEmailToken) {
      await sendEmail(user.email, "Email Verification", emailTemplates.verifyUserEmail(user.verifyEmailToken));
      return res
        .status(StatusCodes.OK)
        .json({ status: `success`, message: "A verification email sent to you, please verify your email to login" });
    } else {
      user.verifyEmailToken = factory.generateEmailVerificationToken();
      await user.save();
      await sendEmail(user.email, "Email Verification", emailTemplates.verifyUserEmail(user.verifyEmailToken));
      return res
        .status(StatusCodes.OK)
        .json({ status: `success`, message: "A verification email sent to you, please verify your email to login" });
    }
  }
  const token = generateToken(user.id);
  return res.status(StatusCodes.OK).json({ status: `success`, token, data: user });
});

// @desc   forget password
// @route  POST /api/v1/auth/forgotPassword
// @access Public
exports.forgotPasswordHandler = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) next(new ApiError("User not found"), StatusCodes.NOT_FOUND);
  // generating 6 random digits reset code
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetPasswordCode = factory.generateHashedPasswordResetCode(resetCode);
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  user.resetCodeVerified = false;
  user.save();
  // sending email to user
  try {
    await sendEmail(user.email, "Reset password", emailTemplates.forgotPassword(resetCode));
    res.status(StatusCodes.OK).json({ status: `success`, message: "Rest Code sent to your email" });
  } catch (error) {
    await factory.setResetPasswordVariablesToUndefined(user);
    next(new ApiError("Error while sending email, please try again later", StatusCodes.INTERNAL_SERVER_ERROR));
  }
});

// @desc   Verify password reset code password
// @route  POST /api/v1/auth/verifyResetCode
// @access Public
exports.verifyPasswordResetCodeHandler = asyncHandler(async (req, res, next) => {
  const { resetCode } = req.body;
  const hashedResetCode = factory.generateHashedPasswordResetCode(resetCode);
  const user = await User.findOne({ resetPasswordCode: hashedResetCode, resetPasswordExpire: { $gt: Date.now() } });
  if (!user) next(new ApiError("Reset Code is invalid or expired", StatusCodes.BAD_REQUEST));
  user.resetCodeVerified = true;
  await user.save();
  res.status(StatusCodes.OK).json({ status: `success`, message: "Reset Code verified" });
});

// @desc   Verify password reset code password
// @route  POST /api/v1/auth/resetPassword
// @access Public
exports.resetPasswordHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) next(new ApiError("No such email", StatusCodes.NOT_FOUND));
  if (!user.resetCodeVerified) next(new ApiError("ResetCode is not verified", StatusCodes.BAD_REQUEST));
  user.password = password;
  await factory.setResetPasswordVariablesToUndefined(user);
  const token = factory.generateToken(user._id);
  res.status(StatusCodes.OK).json({ status: `success`, token, message: "Password reset successfully" });
});

// @desc   Verify email
// @route  GET /api/v1/auth/verify/:token
// @access Public
exports.verifyEmailHandler = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const user = await User.findOne({ verifyEmailToken: token });
  if (!user) return next(new ApiError("Invalid token", StatusCodes.BAD_REQUEST));
  user.emailVerified = true;
  user.verifyEmailToken = undefined;
  await user.save();
  return res.status(StatusCodes.OK).json({ status: `success`, message: "Email verified" });
});
