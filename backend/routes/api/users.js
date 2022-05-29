// backend/routes/api/users.js
const express = require("express");
const router = express.Router();
const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");
const { validateSignup, validateLogin } = require("../../utils/validation");

//================== Sign up =====================//
router.post("/signup", validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;
  const emailCheck = await User.findOne({ where: { email: email } });
  const userCheck = await User.findOne({ where: { username } });

  if (emailCheck) {
    const error = new Error("This e-mail already exists.");
    error.status = 403;
    error.errors = ["User with that email already exits"];
    throw error;
  }

  if (userCheck) {
    const error = new Error("User already exists.");
    error.status = 403;
    error.errors = ["User with that username already exits"];
    throw error;
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
    ...user.toSafeObject(),
    token
  });
});

//================ Login User ==================//
router.post("/login", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    return next(err);
  }
  const token = setTokenCookie(res, user);
  return res.json({
    ...user.toSafeObject(),
    token
  });
});

// =============== Log out =======================//
router.delete("/logout", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logout Successful!" });
});
//
module.exports = router;
