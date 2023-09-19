const { check } = require("express-validator");

const User = require("../../users/model/users.model");
const validatorMiddleware = require("../../../common/middleware/validator.middleware");

exports.addUserAddressValidator = [
  check("alias")
    .notEmpty()
    .withMessage("Address alias is required")
    .custom((value) => {
      return User.findOne({ _id: req.user._id }).then((user) => {
        for (let address in user.addresses) {
          if (user.addresses[address].alias.toLocaleLowerCase() === value.toLocaleLowerCase()) {
            return Promise.reject("Address already exists");
          }
        }
      });
    }),
  check("details")
    .notEmpty()
    .withMessage("Address details is required")
    .isLength({ max: 320 })
    .withMessage("Too long address details"),
  check("phone").optional().isMobilePhone().withMessage("Invalid mobile number"),
  check("postalCode")
    .notEmpty()
    .withMessage("Postal code is required")
    .isPostalCode()
    .withMessage("Invalid postal code"),
  check("city").notEmpty().withMessage("City is required"),
  validatorMiddleware,
];

exports.removeUserAddressValidator = [
  check('addressId').notEmpty().withMessage('ِAddress id is required').isMongoId().withMessage('Invalid address id').custom((value) => {
    return User.findOne({ _id: req.user._id }).then((user) => {
      for (let address in user.addresses) {
        if (user.addresses[address]._id.toString() !== value.toString()) {
          return Promise.reject(new Error('Address not found'));
        }
      }
  })
}),
  validatorMiddleware
]