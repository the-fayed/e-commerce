const { check } = require(`express-validator`);
const slugify = require("slugify");

const User = require(`../users/users.model`);
const validatorMiddleware = require(`../../shared/middlewares/validator.middleware`);

exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage(`Name is required`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) return Promise.reject(new Error("Email already exists"));
      return true;
    }),
  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .custom((value) => {
      User.findOne({ phone: value }).then((user) => {
        if (user) return Promise.reject(new Error("This phone number already associated with another account"));
        return true;
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  check("passwordConfirmation")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(new Error("Password and confirmation does not match"));
      }
      return true;
    }),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage(`Invalid email address`)
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) return Promise.reject(new Error("Email and password does not match"));
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  validatorMiddleware,
];

exports.forgotPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (!user) Promise.reject(new Error("No such email, try to signup"));
        return true;
      })
    ),
  validatorMiddleware,
];

exports.verifyResetCodeValidator = [
  check("resetCode")
    .notEmpty()
    .withMessage("resetCode is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid reset code"),
  validatorMiddleware,
];

exports.resetPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((value) =>
      User.findOne({ email: value, resetCodeVerified: { $gt: Date.now() } }).then((user) => {
        if (!user) Promise.reject(new Error("No such email, try to signup"));
        return true;
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Too short password"),
  check("passwordConfirmation")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(new Error("Password and confirmation does not match"));
      }
      return true;
    }),
  validatorMiddleware,
];
