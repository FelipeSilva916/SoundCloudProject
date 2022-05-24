const express = require("express");
const router = express.Router();
const {
  handleValidationErrors,
  validatePlaylist
} = require("../../utils/validation");
const {
  setTokenCookie,
  requireAuth,
  restoreUser
} = require("../../utils/auth");
const { User, Song, Album, Playlist } = require("../../db/models");

//====== Create a Playlist ========//
router.post(
  "/playlists",
  requireAuth,
  validatePlaylist,
  async (req, res, next) => {
    const { user } = req;
    const { name, imageUrl } = req.body;

    const newPlaylist = await Playlist.create({
      userId: user.id,
      name: name,
      previewImg: imageUrl
    });
    res.status(201);
    res.json(newPlaylist);
  }
);

module.exports = router;
