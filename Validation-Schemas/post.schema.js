const { z } = require("zod");

const postUploadSchema = z.object({
  imageUrl: z.string().url(),
  caption: z.string().optional(),
});

const postUpdateSchema = z.object({
  postId: z.string().uuid(),
  imageUrl: z.string().url().optional(),
  caption: z.string().optional(),
});

const userIdParamSchema = z.object({
  userId: z.string().uuid(),
});

module.exports = {
  postUploadSchema,
  postUpdateSchema,
  userIdParamSchema,
};
