// backend/routes/api/users.js
const express = require("express");
const {
  setTokenCookie,
  requireAuth,
  restoreUser
} = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// =====================================================
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors
];

//=======================================================

//================== Sign up ==========================//
router.post("/signup", validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;
  const userCheck = await User.findOne({ where: { email: email } });

  if (userCheck) {
    const error = new Error("This e-mail already exists.");
    error.status = 403;
    return next(error);
  }

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password
  });

  let token = setTokenCookie(res, user);

  return res.json({
    user,
    token
  });
});

// =============  Log in =================//
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors
];

router.post("/login", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  const token = setTokenCookie(res, user);

  return res.json({
    user: user.toSafeObject(),
    token
  });
});

// =============== Log out =======================//
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});
//

module.exports = router;
