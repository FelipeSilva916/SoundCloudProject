const express = require("express");
const router = express.Router();
const { Song, User, Album, Comment } = require("../../db/models");
const {
  validateComment,
  validateQuery,
  validateSongCreation
} = require("../../utils/validation");
const { environment } = require("../../config");
const isProduction = environment === "production";

const { requireAuth, restoreUser } = require("../../utils/auth");
const {
  singlePublicFileUpload,
  multipleFileKeysUpload
} = require("../../awsS3");

//============= Create song route ====================//
router.post(
  "/",
  requireAuth,
  multipleFileKeysUpload([
    { name: "url", maxCount: 1 },
    { name: "previewImage", maxCount: 1 }
  ]),
  validateSongCreation,
  async (req, res) => {
    const { user } = req;
    const { title, description, albumId } = req.body;
    const url = await singlePublicFileUpload(req.files.url[0]);
    const previewImage = await singlePublicFileUpload(
      req.files.previewImage[0]
    );

    const newSong = await Song.create({
      userId: user.id,
      title,
      description,
      url,
      previewImage,
      albumId
    });
    res.status(201);
    res.json(newSong);
  }
);

//========== Create a comment for song by ID =========//
router.post(
  "/:songId/comments",
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
      throw error;
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

// ========== Edit song by ID ========//
router.put("/:songId", requireAuth, validateSongCreation, async (req, res) => {
  const { user } = req;
  let { songId } = req.params;
  songId = parseInt(songId);
  const { title, description, url, previewImage } = req.body;

  const updateSong = await Song.findByPk(songId);

  if (!updateSong) {
    const error = new Error("Song couldn't be found");
    error.status = 404;
    throw error;
  }

  if (updateSong) {
    if (updateSong.userId === user.id) {
      await updateSong.update({
        title,
        description,
        url,
        previewImage
      });
      res.json(updateSong);
    } else {
      const error = new Error("Not authorized");
      error.status = 403;
      throw error;
    }
  }
});

//=============== Delete Song ======================//
router.delete("/:songId", requireAuth, async (req, res, next) => {
  const { user } = req;
  let { songId } = req.params;
  songId = parseInt(songId);

  const deletedSong = await Song.findByPk(songId);

  if (!deletedSong) {
    const error = new Error("Song could not be found");
    error.status = 404;
    throw error;
  }

  if (deletedSong) {
    if (deletedSong.userId === user.id) {
      await deletedSong.destroy();
      res.json({ message: "Successfully deleted", statusCode: 200 });
    } else {
      const error = new Error("Not Authorized");
      error.status = 403;
      throw error;
    }
  }
});

// ============= GET Comments by song ID ==============//
router.get("/:songId/comments", async (req, res, next) => {
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
    throw error;
  }
});

// ============== Get songs by ID ==================//
router.get("/:songId", async (req, res, next) => {
  let { songId } = req.params;
  songId = parseInt(songId);
  const song = await Song.findByPk(songId, {
    include: [
      {
        model: User,
        as: "Artist",
        attributes: ["id", "username", "previewImage"]
      },
      { model: Album, attributes: ["id", "title", "previewImage"] }
    ]
  });

  if (!song) {
    const error = new Error("Song could not be found");
    error.status = 404;
    throw error;
  }

  return res.json(song);
});
// ======== GET All Songs + Query ============//
router.get("/", validateQuery, async (req, res) => {
  let { page, size, title, createdAt } = req.query;
  let pagination = {};
  let where = {};

  if (page) {
    page = parseInt(page);
  }
  if (size) {
    size = parseInt(size);
  }
  if (!size) size = 20;
  if (!page) page = 0;

  if (page > 10) {
    page = 0;
  } else {
    page = page;
  }

  if (size > 20) {
    size = 20;
  } else {
    size = size;
  }

  if (size) {
    pagination.limit = size;
  }

  if (page && size) {
    pagination.offset = size * (page - 1);
  }

  if (isProduction) {
    if (title) where.title = { [Op.iLike]: `%${title}%` };
  } else {
    if (title) where.title = { [Op.like]: `%${title}%` };
  }

  if (createdAt) {
    where.createdAt = createdAt;
  }

  const Songs = await Song.findAll({
    where: { ...where },
    ...pagination
  });
  res.json({ Songs, page, size });
});

module.exports = router;
