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
const {
  User,
  Song,
  Album,
  Playlist,
  PlaylistSong
} = require("../../db/models");

//========== Create a Playlist ==========//
router.post(
  "/playlists",
  requireAuth,
  validatePlaylist,
  restoreUser,
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

// =========== Add a playlist by Playlist ID ==============//
router.post(
  "/playlists/:playlistId",
  requireAuth,
  restoreUser,
  async (req, res) => {
    const { playlistId } = req.params;
    const { user } = req;
    const { songId } = req.body;

    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist) {
      res.status(404),
        res.json({
          message: "Playlist couldn't be found",
          statusCode: 404
        });
    }
    if (!song) {
      res.status(404),
        res.json({
          message: "Song couldn't be found",
          statusCode: 404
        });
    }

    if (playlist.userId === user.id) {
      const newPlaylistSong = await PlaylistSong.create({
        playlistId,
        songId
      });
      const playlistSong = await PlaylistSong.findOne({
        where: { playlistId, songId },
        attributes: ["id", "playlistId", "songId"]
      });
      res.json(playlistSong);
    } else {
      const error = new Error("Not Authorized");
      error.status = 401;
      throw error;
    }
  }
);

//======= GET Details of playlist from ID ===========//
router.get("/playlists/:playlistId", async (req, res, next) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByPk(playlistId, {
    include: [
      {
        model: Song,
        through: { attributes: [] }
      }
    ]
  });
  if (playlist) res.json(playlist);
  else {
    const error = new Error("Playlist could not be found");
    error.status = 404;
    throw error;
  }
});

module.exports = router;
