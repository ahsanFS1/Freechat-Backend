const prisma = require("../prisma/prisma");

async function createMessageRepo({ conversationId, senderId, content }) {
  return await prisma.message.create({
    data: {
      conversationId,
      senderId,
      content,
    },
  });
}

async function getConversationsRepo(userId) {
  console.log("here");
  return await prisma.conversation.findMany({
    where: {
      OR: [{ user1Id: userId }, { user2Id: userId }],
    },
    include: {
      user1: { select: { id: true, username: true, avatarUrl: true } },
      user2: { select: { id: true, username: true, avatarUrl: true } },
      messages: {
        orderBy: { sentAt: "asc" },
      },
    },
  });
}
async function findOrCreateConversationRepo(user1Id, user2Id) {
  const existing = await prisma.conversation.findFirst({
    where: {
      OR: [
        { user1Id: user1Id, user2Id: user2Id },
        { user1Id: user2Id, user2Id: user1Id },
      ],
    },
    include: {
      user1: true,
      user2: true,
      messages: {
        orderBy: { sentAt: "asc" },
      },
    },
  });

  if (existing) return existing;

  return await prisma.conversation.create({
    data: {
      user1Id,
      user2Id,
    },
    include: {
      user1: true,
      user2: true,
      messages: true,
    },
  });
}

async function getConversationWithMessages(conversationId) {
  return prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      user1: true,
      user2: true,
      messages: { orderBy: { sentAt: "asc" } },
    },
  });
}

module.exports = {
  createMessageRepo,
  getConversationsRepo,
  findOrCreateConversationRepo,
  getConversationWithMessages,
};
