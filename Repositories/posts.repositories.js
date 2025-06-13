const prisma = require("../prisma/prisma");

async function uploadPostsByUserId({ caption, userId, imageUrl }) {
  return await prisma.post.create({
    data: {
      caption,
      userId,
      imageUrl,
    },
  });
}
async function getRecentPosts(limit = 50) {
  return await prisma.post.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      caption: true,
      imageUrl: true,
      createdAt: true,
      user: {
        select: {
          username: true,
          avatarUrl: true,
        },
      },
      likes: {
        select: {
          id: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });
}

async function updatePostsByUserId({ caption, postId, imageUrl }) {
  return await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      caption,
      imageUrl,
    },
  });
}

async function getPostsByUserId({ userId }) {
  return await prisma.post.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      caption: true,
      imageUrl: true,
      createdAt: true,
    },
  });
}

module.exports = {
  uploadPostsByUserId,
  updatePostsByUserId,
  getPostsByUserId,
  getRecentPosts,
};
