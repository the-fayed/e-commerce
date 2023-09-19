const { check } = require("express-validator");
const slugify = require("slugify");
const bcrypt = require(`bcrypt`);

const User = require(`../model/users.model`);
const validatorMiddleware = require(`../../../common/middleware/validator.middleware`);

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage(`User name is required`)
    .isLength({ min: 5 })
    .withMessage(`Too short user name`)
    .isLength({ max: 32 })
    .withMessage(`Too long user name`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage(`Email is required`)
    .isEmail()
    .withMessage("Invalid email address")
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) return Promise.reject(new Error(`Email already exists`));
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Too short password"),
  check(`passwordConfirmation`)
    .notEmpty()
    .withMessage(`Password confirmation is required`)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(new Error(`Password and confirmation doesn't match`));
      }
      return true;
    }),
  check(`avatar`).optional().isString().withMessage("Avatar must be sent as a string bath"),
  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .custom((value) =>
      User.findOne({ phone: value }).then((user) => {
        if (user) return Promise.reject(new Error(`This phone number already associated with another account`));
      })
    ),
  check("role")
    .optional()
    .isString()
    .withMessage(`Invalid role`)
    .isLength({ min: 4 })
    .withMessage("Invalid role")
    .isLength({ max: 5 })
    .withMessage(`Invalid role`),
  validatorMiddleware,
];

exports.getSpecificUserValidator = [
  check("id")
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("Invalid id")
    .custom((value) =>
      User.findOne({ _id: value }).then((user) => {
        if (!user) return Promise.reject(new Error(`No document for this id`));
      })
    ),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id")
    .notEmpty()
    .withMessage(`User id is required`)
    .isMongoId()
    .withMessage(`Invalid id`)
    .custom((value) =>
      User.findOne({ _id: value }).then((user) => {
        if (!user) return Promise.reject(new Error(`No document for this id`));
      })
    ),
  check("name")
    .optional()
    .isLength({ min: 5 })
    .withMessage(`Too short user name`)
    .isLength({ max: 32 })
    .withMessage(`Too long user name`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) return Promise.reject(new Error(`Email already exists`));
      })
    ),
    check('password').isEmpty(),
  check(`avatar`).optional().isString().withMessage("Avatar must be sent as a string bath"),
  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .custom((value) =>
      User.findOne({ phone: value }).then((user) => {
        if (user) return Promise.reject(new Error(`This phone number already associated with another account`));
      })
    ),
  check("role")
    .optional()
    .isString()
    .withMessage(`Invalid role`)
    .isLength({ min: 4 })
    .withMessage("Invalid role")
    .isLength({ max: 5 })
    .withMessage(`Invalid role`),
  validatorMiddleware,
];

exports.updateUserPasswordValidator = [
  check("id")
    .notEmpty()
    .withMessage(`User id is required`)
    .isMongoId()
    .withMessage(`Invalid id`)
    .custom((value) =>
      User.findOne({ _id: value }).then((user) => {
        if (!user) return Promise.reject(new Error(`No document for this id`));
      })
    ),
  check(`currantPassword`)
    .notEmpty()
    .withMessage(`Currant password is required`)
    .custom(async (value, { req }) => {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) throw new Error(`User not found`);
      const isMatch = await bcrypt.compare(value, user.password);
      if (!isMatch) throw new Error(`Incorrect currant password`);
    }),
  check(`newPassword`)
    .notEmpty()
    .withMessage(`Password is required`)
    .isLength({ min: 8 })
    .withMessage(`Too short password`)
    .custom(async (value, { req }) => {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) throw new Error(`User not found`);
      const isMatch = await bcrypt.compare(value, user.password);
      if (isMatch) throw new Error(`New Password and Currant password are the same`);
    }),
  check(`passwordConfirmation`)
    .notEmpty()
    .withMessage(`Password confirmation is required`)
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        return Promise.reject(new Error(`Password and confirmation does not match`));
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id")
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("Invalid id")
    .custom((value) =>
      User.findOne({ _id: value }).then((user) => {
        if (!user) return Promise.reject(new Error(`No document for this id`));
      })
    ),
  validatorMiddleware,
];

exports.updateLoggedUserDataValidator = [
  check("name")
    .optional()
    .isLength({ min: 5 })
    .withMessage(`Too short user name`)
    .isLength({ max: 32 })
    .withMessage(`Too long user name`)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) return Promise.reject(new Error(`Email already exists`));
      })
    ),
  check("password").isEmpty(),
  check(`avatar`).optional().isString().withMessage("Avatar must be sent as a string bath"),
  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .custom((value) =>
      User.findOne({ phone: value }).then((user) => {
        if (user) return Promise.reject(new Error(`This phone number already associated with another account`));
      })
    ),
  check("role").isEmpty().withMessage('You are not authorized to change this property'),
  validatorMiddleware,
];