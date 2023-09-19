const router = require(`express`).Router();

const { isAuthorized } = require("../../../common/middleware/authorization.middleware");
const {
  getAllUsersHandler,
  createUserHandler,
  getSpecificUserHandler,
  updateUserHandler,
  deleteUserHandler,
  updateUserPasswordHandler,
  getLoggedUserDataHandler,
  UpdateLoggedUserHandler,
  updateLoggedUserPasswordHandler,
  deleteLoggedUserHandler,
} = require("../controller/users.controller");

const {
  GET_ALL_USERS,
  UPDATE_USER,
  GET_SPECIFIC_USER,
  DELETE_USER,
  GET_LOGGED_USER,
  UPDATE_LOGGED_USER,
  DELETE_LOGGED_USER,
  CREATE_USER,
} = require("../endpoints");

const { uploadUserAvatar, imageProcessing } = require(`../images/image.processing`);

const {
  createUserValidator,
  getSpecificUserValidator,
  updateUserValidator,
  deleteUserValidator,
  updateUserPasswordValidator,
  updateLoggedUserDataValidator,
} = require(`../validator/users.validator`);

// user routes
router.get(
  "/getLoggedUser",
  isAuthorized(GET_LOGGED_USER),
  getLoggedUserDataHandler,
  getSpecificUserValidator,
  getSpecificUserHandler
);
router.put(
  "/updateLoggedUserData",
  isAuthorized(UPDATE_LOGGED_USER),
  uploadUserAvatar,
  imageProcessing,
  updateLoggedUserDataValidator,
  UpdateLoggedUserHandler,
  updateUserHandler
);
router.put(
  "/changeLoggedUserPassword",
  isAuthorized(UPDATE_LOGGED_USER),
  updateLoggedUserPasswordHandler,
  updateUserPasswordValidator,
  updateUserPasswordHandler
);

router.delete("/deleteLoggedUser", isAuthorized(DELETE_LOGGED_USER), deleteLoggedUserHandler);

// admin Routes
router
  .route(`/`)
  .get(isAuthorized(GET_ALL_USERS), getAllUsersHandler)
  .post(isAuthorized(CREATE_USER), uploadUserAvatar, imageProcessing, createUserValidator, createUserHandler);
router
  .route(`/:id`)
  .get(isAuthorized(GET_SPECIFIC_USER), getSpecificUserValidator, getSpecificUserHandler)
  .put(isAuthorized(UPDATE_USER), uploadUserAvatar, imageProcessing, updateUserValidator, updateUserHandler)
  .delete(isAuthorized(DELETE_USER), deleteUserValidator, deleteUserHandler);
router
  .route(`/changePassword/:id`)
  .put(isAuthorized(UPDATE_USER), updateUserPasswordValidator, updateUserPasswordHandler);

module.exports = router;
