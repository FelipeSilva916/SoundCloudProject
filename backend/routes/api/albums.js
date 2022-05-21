const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require("../../utils/validation");
const {
  setTokenCookie,
  requireAuth,
  restoreUser
} = require("../../utils/auth");
const { User, Song, Album } = require("../../db/models");
const { jwtConfig } = require("../../config");

router.get("/test", (req, res, next) => {
  res.json("Albums go here");
});

// =============== GET All Albums =============== //
router.get("/albums", async (req, res) => {
  const allAlbums = await Album.findAll();
  res.json({ allAlbums });
});

// ================== Create a new Album ====================//
router.post("/albums", requireAuth, restoreUser, async (req, res) => {
  const { user } = req;
  const { title, description, previewImg } = req.body;
  const newAlbum = await Album.create({
    userId: user.id,
    title,
    description,
    previewImg
  });
  res.status(201);
  res.json(newAlbum);
});

module.exports = router;
