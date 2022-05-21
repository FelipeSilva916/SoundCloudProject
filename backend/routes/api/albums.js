const express = require("express");
const { check } = require("express-validator");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Song, User, Album } = require("../../db/models");
const e = require("express");

const router = express.Router();
const { Album, Song, User } = require("../../db/models");

router.post("/albums/:albumId", requireAuth, async (req, res) => {
  const { user } = req;
  const { albumId } = req.params;
  const { title, description, url, previewImg } = req.body;
  const album = await Album.findByPk(albumId);

  if (!album) {
    res.status(404),
      res.json({
        message: "Album couldn't be found",
        statusCode: 404
      });
  }

  if (album) {
    if (album.userId === user.id) {
      const song = await Song.create({
        albumId,
        userId: user.id,
        title,
        description,
        url,
        previewImg
      });
      res.status(201);
      res.json(song);
    }
  }
}
// ============== Get Albums Detail by ID ===========//
router.get("/albums/:albumId", async (req, res) => {
  const { albumId } = req.params;

  const currentAlbum = await Album.findByPk(albumId, {
    include: [
      {
        model: User,
        as: "Artist",
        attributes: ["id", "username", "imgUrl"]
      },
      {
        model: Song
      }
    ]
  });

  if (!currentAlbum) {
    res.status(404);
    res.json("Album couldn't be found");
  }
  res.json({ currentAlbum });
});

// =============== GET All Albums =============== //
router.get("/albums", async (req, res) => {
  const allAlbums = await Album.findAll();
  res.json({ allAlbums });
});

module.exports = router
