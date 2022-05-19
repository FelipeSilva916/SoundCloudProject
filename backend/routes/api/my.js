//import restoreUser
const express = require("express");
const router = express.Router();
const { restoreUser } = require("../../utils/auth");

// Get current user
router.get("/", restoreUser, async (req, res) => {
  const { user, cookies } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
      msg: "Testing My",
      token: cookies.token
    });
  } else return res.json();
});

//get

module.exports = router;
