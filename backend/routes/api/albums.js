const express = require("express");
const { check } = require("express-validator");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Song, User, Album } = require("../../db/models");
const e = require("express");

const router = express.Router();

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
});

module.exports = router;