const {
  createUser,
  loginUser,
  handleFollows,
  updateUserController,
  handleUnfollows,
  getFollowers,
  updateAvatar,
  getFollowing,
  getUsers,
  getUser,
  getUserProfileByUsernameController,
} = require("../Controllers/users.controller");

const authenticateToken = require("../Middlewares/JwtAuthorization");
const validate = require("../Middlewares/ZodValidation");
const {
  createUserSchema,
  loginUserSchema,
  followParamsSchema,
  userIdParamSchema,
  updateAvatarSchema,
  updateUserSchema,
  usernameParamSchema,
} = require("../Validation-Schemas/user.schema");

const express = require("express");
const router = express.Router();

router.post("/create", validate(createUserSchema), createUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.post(
  "/follow/:followerId/:followingId",
  authenticateToken,
  validate(followParamsSchema, "params"),
  handleFollows
);
router.delete(
  "/unfollow/:followerId/:followingId",
  authenticateToken,
  validate(followParamsSchema, "params"),
  handleUnfollows
);
router.get(
  "/follower-count/:userId",
  validate(userIdParamSchema, "params"),
  getFollowers
);
router.get(
  "/following-count/:userId",
  validate(userIdParamSchema, "params"),
  getFollowing
);
router.get("/getUsers", getUsers);
router.put(
  "/update-avatar/:userId",
  authenticateToken,
  validate(userIdParamSchema, "params"),
  validate(updateAvatarSchema),
  updateAvatar
);
router.get(
  "/get-user-details/:userId",
  validate(userIdParamSchema, "params"),
  getUser
);
router.put(
  "/update",
  authenticateToken,
  validate(updateUserSchema),
  updateUserController
);
router.get(
  "/profile/:username",
  validate(usernameParamSchema, "params"),
  getUserProfileByUsernameController
);

module.exports = router;
