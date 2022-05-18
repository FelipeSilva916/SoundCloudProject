const express = require("express");
const router = express.Router();

function requireJSON(req, res, next) {
  if (!req.is("application/json")) {
    res.json({ msg: "Content-Type must be application/json" });
  } else {
    next();
  }
}

router.get("/", (req, res, next) => {
  res.json("User page goes here");
});

router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
});
