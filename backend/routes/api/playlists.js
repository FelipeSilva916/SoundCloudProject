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
const e = require("express");

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
      error.status = 403;
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

//======== Edit a playlist by ID ========//
router.put(
  "/playlists/:playlistId",
  requireAuth,
  validatePlaylist,
  async (req, res) => {
    let { playlistId } = req.params;
    playlistId = parseInt(playlistId);
    const { user } = req;
    const { name, previewImg } = req.body;
    const playlist = await Playlist.findByPk(playlistId);

    if (!playlist) {
      const error = new Error("Playlist could not be found");
      error.status = 404;
      throw error;
    }

    if (playlist) {
      if (playlist.userId === user.id) {
        playlist.update({ name, previewImage: previewImg });
        res.json(playlist);
      } else {
        const error = new Error("Not Authorized");
        error.status = 403;
        throw error;
      }
    }
  }
);

//======== Delete a playlist by ID ================
router.delete(
  "/playlists/:playlistId",
  requireAuth,
  restoreUser,
  async (req, res) => {
    let { playlistId } = req.params;
    playlistId = parseInt(playlistId);
    const { user } = req;
    const selectedPlaylist = await Playlist.findByPk(playlistId);

    if (!selectedPlaylist) {
      const error = new Error("Playlist could not be found");
      error.status = 404;
      throw error;
    }
    if (selectedPlaylist) {
      if (selectedPlaylist.userId === user.id) {
        await selectedPlaylist.destroy();
        res.json({
          message: "Successfully deleted",
          statusCode: 200
        });
      } else {
        const error = new Error("Not Authorized");
        error.status = 403;
        throw error;
      }
    }
  }
);

module.exports = router;
