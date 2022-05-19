const express = require("express");
const router = express.Router();

const apiRouter = require("./api");
const albumRouter = require("./api/albums");
const songRouter = require("./api/songs");
const commentRouter = require("./api/comments");
const playlistsRouter = require("./api/playlists");

//
router.use(apiRouter);
router.use(albumRouter);
router.use(songRouter);
router.use(commentRouter);
router.use(playlistsRouter);

//
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken
  });
});

module.exports = router;
