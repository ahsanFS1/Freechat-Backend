const { createMessageService, getConversationsService} = require("../Services/message.service");
const {findOrCreateConversationRepo,getConversationWithMessages } = require('../Repositories/message.repositories')
async function createMessage(req, res) {
  try {
    const message = await createMessageService(req.body);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: "Failed to create message" });
  }
}

async function getConversations(req, res) {
  try {
    console.log("here")
    const conversations = await getConversationsService(req.params.userId);
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: "Failed to get conversations" });
  }
}
async function findOrCreateConversation(req, res) {
  const { user1Id, user2Id } = req.body;
  if (!user1Id || !user2Id) {
    return res.status(400).json({ error: "Missing user IDs" });
  }

  try {
    const convo = await findOrCreateConversationRepo(user1Id, user2Id);
    res.json(convo);
  } catch (err) {
    console.error("Error creating conversation:", err);
    res.status(500).json({ error: "Failed to create or fetch conversation" });
  }
}

const getConversationById = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await getConversationWithMessages(conversationId);
    res.json(conversation);
    console.log("converations: ",conversation)
  } catch (err) {
    console.error("Error fetching full conversation:", err);
    res.status(500).send("Failed to get conversation");
  }
};

module.exports = { createMessage, getConversations,findOrCreateConversation,getConversationById };
