const { signupHandler, loginHandler, forgotPasswordHandler, verifyPasswordResetCodeHandler, resetPasswordHandler, verifyEmailHandler } = require("../controller/auth.controller");
const { uploadUserAvatar, imageProcessing } = require("../../users/images/image.processing");
const { signupValidator, loginValidator, resetPasswordValidator, verifyResetCodeValidator, forgotPasswordValidator } = require("../validator/auth.validator");

const router = require("express").Router();

router.post("/signup", uploadUserAvatar, imageProcessing, signupValidator, signupHandler);
router.get("/verify/:token", verifyEmailHandler);
router.post("/login", loginValidator, loginHandler);
router.post('/forgotPassword', forgotPasswordValidator, forgotPasswordHandler);
router.post('/verifyResetCode', verifyResetCodeValidator, verifyPasswordResetCodeHandler);
router.put('/resetPassword', resetPasswordValidator, resetPasswordHandler);

module.exports = router;
