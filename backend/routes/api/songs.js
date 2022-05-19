const express = require("express");
const router = express.Router();

router.get("/testsongs", (req, res, next) => {
  res.json("Songs go here");
});

module.exports = router;
