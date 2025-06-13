const prisma = require("../prisma/prisma");

async function createUserInDB({ name, username, email, password }) {
  return await prisma.user.create({
    data: { name, username, email, password },
  });
}

async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function handleFollow({ followerId, followingId }) {
  const followerExists = await prisma.user.findUnique({
    where: { id: followerId },
  });
  const followingExists = await prisma.user.findUnique({
    where: { id: followingId },
  });
  if (!followerExists || !followingExists) {
    return res
      .status(404)
      .json({ error: "One or both user IDs do not exist." });
  }
  return await prisma.follower.create({
    data: {
      followerId,
      followingId,
    },
  });
}

async function handleUnfollow({ followerId, followingId }) {
  return prisma.follower.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
}

async function getFollowersForUserId({ userId }) {
  const followers = await prisma.follower.findMany({
    where: { followingId: userId },
    include: {
      follower: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  return followers.map((f) => f.follower);
}

async function getUsersFromDb() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      avatarUrl: true,
    },
  });

  return users;
}
async function getFollowingForUserId({ userId }) {
  const following = await prisma.follower.findMany({
    where: { followerId: userId },
    include: {
      following: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  return following.map((f) => f.following);
}

async function updateAvatarForUser({ userId, avatarUrl }) {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      avatarUrl: avatarUrl,
    },
  });
  return user;
}

async function getUserFromDb({ userId }) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

async function updateUserById(id, data) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}
async function getUserProfileByUsername(username) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      bio: true,
    },
  });

  if (!user) return null;

  const followers = await getFollowersForUserId({ userId: user.id });
  const following = await getFollowingForUserId({ userId: user.id });

  const posts = await prisma.post.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      caption: true,
      imageUrl: true,
      createdAt: true,
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
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedPosts = posts.map((post) => ({
    id: post.id,
    caption: post.caption,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    likes: post.likes.map((like) => ({
      id: like.id,
      createdAt: like.createdAt,
      user: like.user,
    })),
  }));

  return {
    ...user,
    followers,
    following,
    posts: formattedPosts,
  };
}

module.exports = {
  createUserInDB,
  findUserByEmail,
  handleFollow,
  handleUnfollow,
  getFollowingForUserId,
  getFollowersForUserId,
  getUsersFromDb,
  updateAvatarForUser,
  getUserFromDb,
  updateUserById,
  getUserProfileByUsername,
};
