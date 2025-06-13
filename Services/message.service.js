const {
  createMessageRepo,
  getConversationsRepo,
} = require("../Repositories/message.repositories");

async function createMessageService(data) {
  return await createMessageRepo(data);
}

async function getConversationsService(userId) {
  return await getConversationsRepo(userId);
}

module.exports = {
  createMessageService,
  getConversationsService,
};
