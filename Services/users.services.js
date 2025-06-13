const bcrypt = require("bcryptjs");
const {
  createUserInDB,
  findUserByEmail,
  handleUnfollow,
  handleFollow,
  getFollowingForUserId,
  getFollowersForUserId,
  getUsersFromDb,
  updateAvatarForUser,
  getUserFromDb,
  updateUserById,
  getUserProfileByUsername,
} = require("../Repositories/users.repositories");

async function createUserService({ name, username, email, password }) {
  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await createUserInDB({
    name,
    username,
    email,
    password: hashedPassword,
  });
}

async function loginUserService({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  return user;
}

async function handleFollowsService({ followerId, followingId }) {
  const follow = await handleFollow({ followerId, followingId });
  if (!follow) throw new Error("Can not follow at the time");
  return follow;
}
async function handleUnfollowsService({ followerId, followingId }) {
  const unfollow = await handleUnfollow({ followerId, followingId });
  if (!unfollow) throw new Error("Can not unfollow at the time");
  return unfollow;
}

async function getFollowingService({ userId }) {
  const following = await getFollowingForUserId({ userId });
  if (!following) throw new Error("Can not fetch following at the time");
  return following;
}

async function getFollowersService({ userId }) {
  const followers = await getFollowersForUserId({ userId });
  if (!followers) throw new Error("Can not fetch followers at the time");
  return followers;
}

async function updateAvatarService({ userId, avatarUrl }) {
  const user = await updateAvatarForUser({ userId, avatarUrl });
  if (!user) throw new Error("Can not update avatar at the time");
  return user;
}

async function getUsersService() {
  const users = await getUsersFromDb();
  if (!users) throw new Error("Can not fetch users at the time");
  return users;
}

async function getUserService({ userId }) {
  const user = await getUserFromDb({ userId });
  if (!user) throw new Error("Can not fetch user at the time");
  return user;
}

async function updateUserService({ id, ...data }) {
  if (!id) throw new Error("User ID is required.");
  return await updateUserById(id, data);
}

async function getUserProfileByUsernameService(username) {
  const profile = await getUserProfileByUsername(username);
  if (!profile) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  return profile;
}

module.exports = {
  createUserService,
  loginUserService,
  handleFollowsService,
  handleUnfollowsService,
  getFollowersService,
  getFollowingService,
  getUsersService,
  updateAvatarService,
  getUserService,
  updateUserService,
  getUserProfileByUsernameService,
};
