const express = require("express");
const router = express.Router();

router.get("/test", (req, res, next) => {
  res.json("Albums go here");
});

module.exports = router;
