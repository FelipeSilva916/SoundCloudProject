const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { Song, User, Album } = require("../../db/models");

router.get("/testsongs", (req, res, next) => {
  res.json("Songs go here");
});

router.get("/", async (req, res) => {
  const songs = await Song.findAll();
  res.json({ songs });
});
module.exports = router;
