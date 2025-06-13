const express = require("express");
const router = express.Router();
const {
  likePostController,
  unlikePostController,
} = require("../Controllers/likes.controller");

router.post("/like/:userId/:postId", likePostController);
router.delete("/unlike/:userId/:postId", unlikePostController);

module.exports = router;
