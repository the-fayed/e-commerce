const router = require("express").Router();

const {
  signupHandler,
  loginHandler,
  forgotPasswordHandler,
  verifyPasswordResetCodeHandler,
  resetPasswordHandler,
  verifyEmailHandler,
} = require("./auth.controller");
const { uploadUserAvatar, imageProcessing } = require("../users/image-processing");
const {
  signupValidator,
  loginValidator,
  resetPasswordValidator,
  verifyResetCodeValidator,
  forgotPasswordValidator,
} = require("./auth.validator");

router.post("/signup", uploadUserAvatar, imageProcessing, signupValidator, signupHandler);
router.get("/verify/:token", verifyEmailHandler);
router.post("/login", loginValidator, loginHandler);
router.post("/forgotPassword", forgotPasswordValidator, forgotPasswordHandler);
router.post("/verifyResetCode", verifyResetCodeValidator, verifyPasswordResetCodeHandler);
router.put("/resetPassword", resetPasswordValidator, resetPasswordHandler);

module.exports = router;
