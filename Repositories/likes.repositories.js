const prisma = require("../prisma/prisma");

async function likePost({ userId, postId }) {
  return await prisma.like.create({
    data: { userId, postId },
  });
}

async function unlikePost({ userId, postId }) {
  return await prisma.like.delete({
    where: {
      userId_postId: { userId, postId },
    },
  });
}

async function hasLikedPost({ userId, postId }) {
  return await prisma.like.findUnique({
    where: {
      userId_postId: { userId, postId },
    },
  });
}

module.exports = {
  likePost,
  unlikePost,
  hasLikedPost,
};
