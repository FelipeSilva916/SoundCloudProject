const express = require("express");
const router = express.Router();

const { Comment } = require("../../db/models");
const { validateComment } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");

// ============= Edit comment ===============//
router.put(
  "/:commentId",
  requireAuth,
  validateComment,
  async (req, res, next) => {
    let { commentId } = req.params;
    commentId = parseInt(commentId);
    const { user } = req;
    const { body } = req.body;

    const updateComment = await Comment.findByPk(commentId);

    if (updateComment) {
      if (updateComment.userId === user.id) {
        await updateComment.update({ body });
        res.json(updateComment);
      } else {
        const error = new Error("Not authorized");
        error.status = 401;
        throw error;
      }
    } else {
      const error = new Error("Comment could not be found");
      error.status = 404;
      throw error;
    }
  }
);

//=========== Delete a comment by ID ==============//
router.delete("/:commentId", requireAuth, async (req, res, next) => {
  const { commentId } = req.params;
  const { user } = req;

  const deleteComment = await Comment.findByPk(commentId);

  if (deleteComment) {
    if (deleteComment.userId === user.id) {
      await deleteComment.destroy();
      res.json({ message: "Successfully deleted", statusCode: 200 });
    } else {
      const error = new Error("Not Authorized");
      error.status = 401;
      throw error;
    }
  } else {
    const error = new Error("Comment could not be found");
    error.status = 404;
    throw error;
  }
});

module.exports = router;
