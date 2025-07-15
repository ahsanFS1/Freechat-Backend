const express = require("express");
const {
  uploadPost,
  updatePost,
  getPosts,
  getRecentPostsHandler,
  deletePost,
} = require("../Controllers/posts.controller");

const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const authenticateToken = require("../Middlewares/JwtAuthorization");
const validate = require("../Middlewares/ZodValidation");

const {
  postUploadSchema,
  postUpdateSchema,
  userIdParamSchema,
} = require("../Validation-Schemas/post.schema");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
  "/create/:userId",
  authenticateToken,
  validate(postUploadSchema, "body"),
  validate(userIdParamSchema, "params"),
  uploadPost
);

router.put("/update/:postId", validate(postUpdateSchema), updatePost);

router.get("/get-posts/:userId", validate(userIdParamSchema), getPosts);

router.get("/recent-posts", getRecentPostsHandler);

router.delete("/delete/:postId", deletePost);

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
