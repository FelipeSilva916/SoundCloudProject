const express = require("express");
const router = express.Router();

router.get("/testplaylists", (req, res, next) => {
  res.json("playlists go here");
});

module.exports = router;
