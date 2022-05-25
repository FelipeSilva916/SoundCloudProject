const express = require("express");

const router = express.Router();

const {
  handleValidationErrors,
  validateAlbumCreation
} = require("../../utils/validation");
const {
  setTokenCookie,
  requireAuth,
  restoreUser
} = require("../../utils/auth");
const { User, Song, Album, Playlist } = require("../../db/models");
const e = require("express");

//=======GET Details of Artist by ID ===========//
router.get("/artists/:artistId", async (req, res, next) => {
  let { artistId } = req.params;
  artistId = parseInt(artistId);

  const totalSongs = await Song.count({ where: { userId: artistId } });
  const totalAlbums = await Album.count({ where: { userId: artistId } });

  const artist = await User.findByPk(artistId, {
    attributes: ["id", "username", "imgUrl"]
  });

  if (artist) {
    res.json({
      id: artist.id,
      username: artist.username,
      totalSongs,
      totalAlbums,
      imgUrl: artist.imgUrl
    });
  } else {
    res.json({
      message: "Album couldn't be found",
      statusCode: 404
    });
  }
});

// ========== GET All Songs of Artist by ID ============//
router.get("/artists/:artistId/songs", async (req, res, next) => {
  let { artistId } = req.params;
  artistId = parseInt(artistId);

  const artist = await User.findByPk(artistId);

  if (artist) {
    const songs = await Song.findAll({
      where: { userId: artistId }
    });
    res.json({
      Songs: songs
    });
  } else {
    res.json({
      message: "Artist couldn't be found",
      statusCode: 404
    });
  }
});

//========= GET All Albums of artist by ID ===========//
router.get("/artists/:artistId/albums", async (req, res) => {
  let { artistId } = req.params;
  artistId = parseInt(artistId);

  const artist = await User.findByPk(artistId);

  if (artist) {
    const albums = await Album.findAll({
      where: { userId: artistId }
    });
    res.json({
      albums: albums
    });
  } else {
    res.json({
      message: "Artist couldn't be found",
      statusCode: 404
    });
  }
});

// ======== GET All playlists of artist by ID =========//
router.get("/artists/:artistId/playlists", async (req, res) => {
  let { artistId } = req.params;
  artistId = parseInt(artistId);

  const artist = await User.findByPk(artistId);

  if (artist) {
    const playlists = await Playlist.findAll({ where: { userId: artistId } });
    res.json({ Playlists: playlists });
  } else
    res.json({
      message: "Artist couldn't be found",
      statusCode: 404
    });
});

module.exports = router;
