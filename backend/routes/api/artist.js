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

//=======GET Details of Artist by ID ===========//
router.get("/artists/:artistId", async (req, res, next) => {
  const { artistId } = req.params;

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

module.exports = router;
