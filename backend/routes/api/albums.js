const express = require("express");
const router = express.Router();
const { Album, Song, User } = require("../../db/models");

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

module.exports = router;
