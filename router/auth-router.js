const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth-controller');
const signUpSchema = require("../validators/auth-signUp-validator");
const validate = require('../middlewares/validate-middleware');
const loginSchema = require('../validators/auth-login-validator');
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers
    .home);

router.route("/register").post( validate(signUpSchema), authControllers.register);
router.route("/login").post(validate(loginSchema),authControllers.login);
router.route("/user").get(authMiddleware, authControllers.user);
module.exports = router;