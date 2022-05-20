//import restoreUser
const express = require("express");
const router = express.Router();
const { restoreUser, requireAuth } = require("../../utils/auth");

const { Song, User, Album } = require("../../db/models");

//=========== GET current user
router.get("/my", restoreUser, async (req, res) => {
  const { user, cookies } = req;
  if (user) {
    return res.json({
      ...user.toSafeObject(),
      token: cookies.token
    });
  } else return res.json();
});

//========= GET albums by current user
router.get("/my/albums", requireAuth, async (req, res) => {
  const { user } = req;

  const albums = await Album.findAll({
    where: { userId: user.id }
  });
  res.json(albums);
});

//========== GET Songs
router.get("/my/songs", requireAuth, async (req, res) => {
  const { user } = req;
  const songs = await Song.findAll({
    where: { userId: user.id }
  });
  res.json(songs);
});

module.exports = router;
