//import restoreUser
const express = require("express");
const router = express.Router();
const { restoreUser, requireAuth } = require("../../utils/auth");
const { Song, User, Album, Playlist } = require("../../db/models");

//Token or no token?
//============= GET current user =====================//
router.get("/", restoreUser, async (req, res) => {
  const { user, cookies } = req;
  if (user) {
    return res.json({
      ...user.toSafeObject()
      // token: cookies.token
    });
  } else {
    const error = new Error("Authentication required");
    error.status = 401;
    throw error;
  }
});

//========= GET albums by current user
router.get("/albums", requireAuth, async (req, res) => {
  const { user } = req;

  const albums = await Album.findAll({
    where: { userId: user.id }
  });
  res.json({ Albums: albums });
});

//========== GET Current user's Songs ====================//
router.get("/songs", requireAuth, async (req, res) => {
  const { user } = req;
  const songs = await Song.findAll({
    where: { userId: user.id }
  });
  res.json({ Songs: songs });
});

//========== GET Playlist by Current User =============//
router.get("/playlists", requireAuth, async (req, res) => {
  const { user } = req;

  const currentUserPlaylist = await user.getPlaylists();
  res.json({ Playlist: currentUserPlaylist });
});

module.exports = router;
