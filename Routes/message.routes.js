const express = require("express");
const router = express.Router();
const {
  createMessage,
  getConversations,
  getConversationById,
} = require("../Controllers/message.controller");
const {
  findOrCreateConversation,
} = require("../Controllers/message.controller");
router.post("/messages", createMessage);
router.get("/conversations/:userId", getConversations);
router.post("/conversations", findOrCreateConversation);
router.get("/conversation/:conversationId", getConversationById);
module.exports = router;
