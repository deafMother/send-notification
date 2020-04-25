const express = require("express");
const commentController = require("../controller/commentController");
const router = express.Router();

router
  .route("/:userId?")
  .post(commentController.addComment)
  .get(commentController.getComments);

module.exports = router;
