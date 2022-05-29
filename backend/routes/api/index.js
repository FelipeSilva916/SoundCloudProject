const express = require("express");
const router = express.Router();
const {
  restoreUser,
  requireAuth,
  setTokenCookie
} = require("../../utils/auth.js");
const { User } = require("../../db/models");

//=============== Test Routes ============================//
router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition"
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

//===========  GET /api/restore-user ================//
router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});

//========  GET /api/require-auth ==================//
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
