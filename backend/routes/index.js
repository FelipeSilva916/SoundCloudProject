const express = require("express");
const router = express.Router();

// const apiRouter = require("./api"); // keep
const albumRouter = require("./api/albums");
const songRouter = require("./api/songs");
const commentRouter = require("./api/comments");
const playlistsRouter = require("./api/playlists");
const myRouter = require("./api/my");
const artistRouter = require("./api/artist");
const userRouter = require("./api/users");
//
// router.use(apiRouter); //keep
router.use("/albums", albumRouter);
router.use("/songs", songRouter);
router.use("/comments", commentRouter);
router.use("/playlists", playlistsRouter);
router.use("/my", myRouter);
router.use("/artists", artistRouter);
router.use(userRouter);
//
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken
  });
});

module.exports = router;
