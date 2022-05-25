const express = require("express");
const router = express.Router();
const {
  validateAlbumCreation,
  validateSongCreation
} = require("../../utils/validation");
const { requireAuth, restoreUser } = require("../../utils/auth");
const { User, Song, Album } = require("../../db/models");

// ========= Create Song for an Album by ID ========//
router.post(
  "/:albumId",
  requireAuth,
  validateSongCreation,
  async (req, res) => {
    const { user } = req;
    let { albumId } = req.params;
    albumId = parseInt(albumId);

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
          albumId: parseInt(albumId),
          userId: user.id,
          title,
          description,
          url,
          previewImg
        });
        res.status(201);
        res.json(song);
      } else {
        res.status(403),
          res.json({
            message: "Unauthorized",
            statusCode: 403
          });
      }
    }
  }
);

// =========== Edit an album by ID ====================//
router.put(
  "/:albumId",
  requireAuth,
  validateAlbumCreation,
  async (req, res, next) => {
    let { albumId } = req.params;
    albumId = parseInt(albumId);
    const { user } = req;
    const { title, description, previewImg } = req.body;

    const currentAlbum = await Album.findByPk(albumId);

    if (!currentAlbum) {
      res.status(404),
        res.json({
          message: "Album couldn't be found",
          statusCode: 404
        });
    }
    if (currentAlbum) {
      if (currentAlbum.userId === user.id) {
        const album = await currentAlbum.update({
          title,
          description,
          previewImg
        });
        res.json(album);
      } else {
        const error = new Error("Not Authorized");
        error.status = 401;
        throw error;
      }
    }
  }
);

// ============== Get Albums Detail by ID ===========//
router.get("/:albumId", async (req, res) => {
  let { albumId } = req.params;
  albumId = parseInt(albumId);

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
    const error = new Error("Album not found");
    error.status = 404;
    throw error;
  }

  res.json(currentAlbum);
});

// =============== GET All Albums =============== //
router.get("/", async (req, res) => {
  const allAlbums = await Album.findAll();
  res.json({ Albums: allAlbums });
});

// ================== Create a new Album ====================//
router.post("/", requireAuth, validateAlbumCreation, async (req, res) => {
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

// ============ Delete Album ===============//
router.delete("/:albumId", requireAuth, restoreUser, async (req, res, next) => {
  let { albumId } = req.params;
  albumId = parseInt(albumId);
  const { user } = req;

  const deleteAlbum = await Album.findByPk(albumId);

  if (!deleteAlbum) {
    const error = new Error("Album could not be found");
    error.status = 404;
    return next(error);
  }

  if (deleteAlbum) {
    if (deleteAlbum.userId === user.id) {
      await deleteAlbum.destroy();
      res.json({ message: "Successfully deleted", statusCode: 200 });
    } else {
      const error = new Error("Not Authorized");
      error.status = 401;
      return next(error);
    }
  }
});

module.exports = router;
