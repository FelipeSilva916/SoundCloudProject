const express = require("express");
const router = express.Router();
const { Song, User, Album, Comment } = require("../../db/models");
const {
  handleValidationErrors,
  validateComment
} = require("../../utils/validation");

const {
  setTokenCookie,
  requireAuth,
  restoreUser
} = require("../../utils/auth");

//======= Create a comment for song by ID =========//
router.post(
  "/songs/:songId/comments",
  requireAuth,
  validateComment,
  restoreUser,
  async (req, res, next) => {
    let { songId } = req.params;
    songId = parseInt(songId);
    const { user } = req;
    const { body } = req.body;

    const currentSong = await Song.findByPk(songId);

    if (!currentSong) {
      const error = new Error("Song could not be found");
      error.status = 404;
      return next(error);
    }

    if (currentSong) {
      const comment = await Comment.create({
        userId: user.id,
        songId,
        body
      });
      res.json(comment);
    }
  }
);

// ============== Get songs by ID ==================//
router.get("/songs/:songId", async (req, res, next) => {
  let { songId } = req.params;
  songId = parseInt(songId);
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

// ========== Edit song by ID ========//
router.put("/songs/:songId", requireAuth, async (req, res) => {
  const { user } = req;
  let { songId } = req.params;
  songId = parseInt(songId);
  const { title, description, url, previewImg } = req.body;

  const updateSong = await Song.findByPk(songId);

  if (!updateSong) {
    const error = new Error("Song couldn't be found");
    error.status(404);
    throw error;
  }

  if (updateSong) {
    if (updateSong.userId === user.id) {
      await updateSong.update({
        title,
        description,
        url,
        previewImg
      });
      res.json(updateSong);
    } else {
      const error = new Error("Not authorized");
      error.status(401);
      throw error;
    }
  }
});

//=============== Delete Song ======================//
router.delete(
  "/songs/:songId",
  requireAuth,
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    let { songId } = req.params;
    songId = parseInt(songId);

    const deletedSong = await Song.findByPk(songId);

    if (!deletedSong) {
      const error = new Error("Song could not be found");
      error.status = 404;
      return next(error);
    }

    if (deletedSong) {
      if (deletedSong.userId === user.id) {
        await deletedSong.destroy();
        res.json({ message: "Successfully deleted" });
      } else {
        const error = new Error("Not Authorized");
        error.status = 401;
        return next(error);
      }
    }
  }
);

// ============= GET Comments by song ID ==============//
router.get("/songs/:songId/comments", async (req, res, next) => {
  let { songId } = req.params;
  songId = parseInt(songId);
  const song = await Song.findByPk(songId, {
    include: [
      {
        model: Comment,
        include: [{ model: User, attributes: ["id", "username"] }]
      }
    ]
  });

  if (song) {
    const comment = song.Comments;
    res.json({ Comments: comment });
  } else {
    const error = new Error("Song could not be found");
    error.status = 404;
    return next(error);
  }
});

// ================= Get all songs ================//
router.get("/songs", async (req, res) => {
  const songs = await Song.findAll();
  res.json({ Songs: songs });
});

module.exports = router;
