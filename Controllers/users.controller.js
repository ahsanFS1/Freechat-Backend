const {
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
} = require("../Services/users.services");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const { name, username, email, password } = req.body;
  try {
    const user = await createUserService({ name, username, email, password });
    return res.status(201).json(user);
  } catch (err) {
    const status = err.code === "P2002" ? 409 : 500;
    const message =
      err.code === "P2002"
        ? "Username or email already in use."
        : "Server error";
    return res.status(status).json({ error: message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await loginUserService({ email, password });
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

async function handleFollows(req, res) {
  try {
    const user = await handleFollowsService(req.params);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

async function handleUnfollows(req, res) {
  try {
    await handleUnfollowsService(req.params);
    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(404).json({ error: "Follow relationship not found" });
  }
}

async function getFollowers(req, res) {
  try {
    const followers = await getFollowersService(req.params);
    res.json({ followers });
  } catch (err) {
    res.status(404).json({ error: "Cant find Followers" });
  }
}

async function getFollowing(req, res) {
  try {
    const following = await getFollowingService(req.params);
    res.json({ following });
  } catch (err) {
    res.status(404).json({ error: "Cant find Following" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (err) {
    res.status(404).json({ error: "Cant find Users" });
  }
}

async function updateAvatar(req, res) {
  try {
    const user = await updateAvatarService({ ...req.params, ...req.body });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: "Cant upload Avatar" });
  }
}

async function getUser(req, res) {
  try {
    const user = await getUserService(req.params);
    res.json(user);
  } catch (err) {
    console.log("Cant fetch the user");
  }
}

async function updateUserController(req, res) {
  try {
    const updatedUser = await updateUserService(req.body);
    res.json(updatedUser);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: "Failed to update user." });
  }
}

async function getUserProfileByUsernameController(req, res) {
  try {
    const profile = await getUserProfileByUsernameService(req.params.username);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
}

module.exports = {
  createUser,
  loginUser,
  handleFollows,
  handleUnfollows,
  getFollowers,
  getFollowing,
  getUsers,
  updateAvatar,
  getUser,
  updateUserController,
  getUserProfileByUsernameController,
};
