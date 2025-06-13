const likeService = require("../Services/likes.service");

async function likePostController(req, res) {
  const { userId, postId } = req.params;
  try {
    const result = await likeService.handleLikePost({ userId, postId });
    res.json({ success: true, like: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function unlikePostController(req, res) {
  const { userId, postId } = req.params;
  try {
    await likeService.handleUnlikePost({ userId, postId });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = {
  likePostController,
  unlikePostController,
};
