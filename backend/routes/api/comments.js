const express = require("express");
const router = express.Router();

router.get("/testcomments", (req, res, next) => {
  res.json("comments go here");
});

module.exports = router;
