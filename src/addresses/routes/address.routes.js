const router = require("express").Router();

const {
  getLoggedUserAddresses,
  addUserAddressHandler,
  removeUserAddressHandler,
} = require("../controller/addresses.controller");

const { isAuthorized } = require("../../../common/middleware/authorization.middleware");

const { GET_USER_ADDRESSES, ADD_USER_ADDRESS, DELETE_USER_ADDRESS } = require("../endpoints");

const { removeUserAddressValidator, addUserAddressValidator } = require("../validator/addresses.validator");

router
  .route("/")
  .get(isAuthorized(GET_USER_ADDRESSES), getLoggedUserAddresses)
  .post(isAuthorized(ADD_USER_ADDRESS), addUserAddressValidator , addUserAddressHandler);

router.delete("/:addressId", isAuthorized(DELETE_USER_ADDRESS), removeUserAddressValidator, removeUserAddressHandler);

module.exports = router;
