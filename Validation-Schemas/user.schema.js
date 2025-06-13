const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const followParamsSchema = z.object({
  followerId: z.string().uuid(),
  followingId: z.string().uuid(),
});

const userIdParamSchema = z.object({
  userId: z.string().uuid(),
});

const updateAvatarSchema = z.object({
  avatarUrl: z.string().url(),
});

const updateUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

const usernameParamSchema = z.object({
  username: z.string().min(3),
});

module.exports = {
  createUserSchema,
  loginUserSchema,
  followParamsSchema,
  userIdParamSchema,
  updateAvatarSchema,
  updateUserSchema,
  usernameParamSchema,
};
