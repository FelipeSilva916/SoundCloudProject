//import restoreUser
const express = require("express");
const router = express.Router();
const { restoreUser, requireAuth } = require("../../utils/auth");

const { Song, User, Album, Playlist } = require("../../db/models");

//============= GET current user =====================//
router.get("/my", restoreUser, async (req, res) => {
  const { user, cookies } = req;
  if (user) {
    return res.json({
      ...user.toSafeObject(),
      token: cookies.token
    });
  } else {
    const error = new Error("Invalid Request");
    error.status = 400;
    throw error;
  }
});

//========= GET albums by current user
router.get("/my/albums", requireAuth, async (req, res) => {
  const { user } = req;

  const albums = await Album.findAll({
    where: { userId: user.id }
  });
  res.json(albums);
});

//========== GET Current user's Songs ====================//
router.get("/my/songs", requireAuth, async (req, res) => {
  const { user } = req;
  const songs = await Song.findAll({
    where: { userId: user.id }
  });
  res.json(songs);
});

//========== GET Playlist by Current User =============//
router.get("/my/playlists", requireAuth, async (req, res) => {
  const { user } = req;

  const currentUserPlaylist = await user.getPlaylists();
  res.json({ Playlist: currentUserPlaylist });
});

module.exports = router;
