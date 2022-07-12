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
router.use("/api/albums", albumRouter);
router.use("/api/songs", songRouter);
router.use("/api/comments", commentRouter);
router.use("/api/playlists", playlistsRouter);
router.use("/api/my", myRouter);
router.use("/api/artists", artistRouter);
router.use(userRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.json({});
  });
}
//
// router.get("/api/csrf/restore", (req, res) => {
//   const csrfToken = req.csrfToken();
//   res.cookie("XSRF-TOKEN", csrfToken);
//   res.status(200).json({
//     "XSRF-Token": csrfToken
//   });
// });

router.get("/", (req, res) => {
  res.send("Welcome To My App 👋🏼");
});

module.exports = router;
