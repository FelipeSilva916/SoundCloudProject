const express = require("express");
const router = express.Router();
const { User, Song, Album, Playlist } = require("../../db/models");

// ========== GET All Songs of Artist by ID ============//
router.get("/:artistId/songs", async (req, res, next) => {
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
    const error = new Error("Artist couldn't be found");
    error.status = 404;
    return next(error);
  }
});

//========= GET All Albums of artist by ID ===========//
router.get("/:artistId/albums", async (req, res) => {
  let { artistId } = req.params;
  artistId = parseInt(artistId);

  const artist = await User.findByPk(artistId);

  if (artist) {
    const albums = await Album.findAll({
      where: { userId: artistId }
    });
    res.json({
      Albums: albums
    });
  } else {
    const error = new Error("Artist couldn't be found");
    error.status = 404;
    return next(error);
  }
});

// ======== GET All playlists of artist by ID =========//
router.get("/:artistId/playlists", async (req, res) => {
  let { artistId } = req.params;
  artistId = parseInt(artistId);

  const artist = await User.findByPk(artistId);

  if (artist) {
    const playlists = await Playlist.findAll({ where: { userId: artistId } });
    if (!playlists.length) {
      const error = new Error("Playlist not found");
      error.status = 404;
      throw error;
    }
    res.json({ Playlists: playlists });
  } else {
    const error = new Error("Playlist not found");
    error.status = 404;
    throw error;
  }
});

//=======GET Details of Artist by ID ===========//
router.get("/:artistId", async (req, res, next) => {
  let { artistId } = req.params;
  artistId = parseInt(artistId);

  const totalSongs = await Song.count({ where: { userId: artistId } });
  const totalAlbums = await Album.count({ where: { userId: artistId } });

  const artist = await User.findByPk(artistId, {
    attributes: ["id", "username", "previewImage"]
  });

  if (artist) {
    res.json({
      id: artist.id,
      username: artist.username,
      totalSongs,
      totalAlbums,
      previewImage: artist.previewImage
    });
  } else {
    const error = new Error("Artist couldn't be found");
    error.status = 404;
    return next(error);
  }
});
module.exports = router;
