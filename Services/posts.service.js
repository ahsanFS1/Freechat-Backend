const {
  uploadPostsByUserId,
  updatePostsByUserId,
  getPostsByUserId,
  getRecentPosts,
  deletePostByPostId,
} = require("../Repositories/posts.repositories");

async function uploadPostService({ userId, imageUrl, caption }) {
  return await uploadPostsByUserId({ userId, imageUrl, caption });
}

async function updatePostService({ postId, imageUrl, caption }) {
  return await updatePostsByUserId({ postId, imageUrl, caption });
}
async function fetchRecentPosts(limit = 50) {
  return await getRecentPosts(limit);
}

async function getPostsService({ userId }) {
  return await getPostsByUserId({ userId });
}

async function deletePostByPostIdService({ postId }) {
  return await deletePostByPostId({ postId });
}

module.exports = {
  uploadPostService,
  updatePostService,
  getPostsService,
  fetchRecentPosts,
  deletePostByPostIdService,
};
