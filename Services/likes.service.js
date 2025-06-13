const likeRepo = require("../Repositories/likes.repositories");

async function handleLikePost({ userId, postId }) {
  const existing = await likeRepo.hasLikedPost({ userId, postId });
  if (existing) throw new Error("Post already liked");

  return await likeRepo.likePost({ userId, postId });
}

async function handleUnlikePost({ userId, postId }) {
  const existing = await likeRepo.hasLikedPost({ userId, postId });
  if (!existing) throw new Error("Post not liked yet");

  return await likeRepo.unlikePost({ userId, postId });
}

module.exports = {
  handleLikePost,
  handleUnlikePost,
};
