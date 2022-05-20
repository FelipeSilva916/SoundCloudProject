const express = require("express");
const router = express.Router();
const { Album } = require("../../db/models");

router.get("/test", (req, res, next) => {
  res.json("Albums go here");
});

// =============== GET All Albums =============== //
router.get("/albums", async (req, res) => {
  const allAlbums = await Album.findAll();
  res.json({ allAlbums });
});

module.exports = router;
