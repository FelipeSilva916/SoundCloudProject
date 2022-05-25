const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Validation error");
    err.errors = errors;
    err.status = 400;
    next(err);
  }
  next();
};

// ======== Validate Album Creation ==========//
const validateAlbumCreation = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Album title is required"),
  handleValidationErrors
];

//===== Validate Song Creation ============//
validateSongCreation = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Song title is required"),
  check("url").exists({ checkFalsy: true }).withMessage("Audio is required"),
  handleValidationErrors
];

// ======== Validate an User Sign up ================//
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors
];

// =============  Log in =================//
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors
];

//======= Validate Creation of Playlist =============//
const validatePlaylist = [
  check("name").exists({ checkFalsy: true }).withMessage("Name is required"),
  handleValidationErrors
];

//======= Validate Comment ========//
const validateComment = [
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Comment body text is required"),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateAlbumCreation,
  validateSongCreation,
  validateSignup,
  validateLogin,
  validatePlaylist,
  validateComment
};
