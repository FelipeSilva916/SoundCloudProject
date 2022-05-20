//import restoreUser
const express = require("express");
const router = express.Router();
const { restoreUser, requireAuth } = require("../../utils/auth");

// Get current user
router.get("/", restoreUser, async (req, res) => {
  const { user, cookies } = req;
  if (user) {
    return res.json({
      ...user.toSafeObject(),
      token: cookies.token
    });
  } else return res.json();
});

//get albums by current user
router.get("/albums", async (req, res) => {
  const { user } = req;

  const albums = await Album.find.findAll({
    where: { userId: user.is }
  });
  res.json(albums);
});

module.exports = router;
