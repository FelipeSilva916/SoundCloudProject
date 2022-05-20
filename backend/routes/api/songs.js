const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { Song, User, Album } = require("../../db/models");

const {
  setTokenCookie,
  requireAuth,
  restoreUser
} = require("../../utils/auth");

router.get("/testsongs", (req, res, next) => {
  res.json("Songs go here");
});

// ============== Get songs by ID ==================//
router.get("/songs/:songId", async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId, {
    include: [
      { model: User, as: "Artist", attributes: ["id", "username", "imgUrl"] },
      { model: Album, attributes: ["id", "title", "previewImg"] }
    ]
  });

  if (!song) {
    const error = new Error("Song could not be found");
    error.status = 404;
    return next(error);
  }

  return res.json(song);
});

//=============== Delete Song ======================//
router.delete("/songs/:songId", requireAuth, async (req, res) => {
  const { user } = req;
  const { songId } = req.params;

  const deletedSong = await Song.findByPk(songId);

  if (deletedSong) {
    if (deletedSong.userId === user.id) {
      await deletedSong.destroy();
      res.json({ message: "Successfully deleted" });
    }
  }
});

// ================= Get all songs ================//
router.get("/songs", async (req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
});

module.exports = router;
