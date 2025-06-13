const onlineUsers = new Map();

function setupMessageSocket(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("userConnected", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined room ${conversationId}`);
    });

    socket.on("sendMessage", ({ conversationId, message }) => {
      io.to(conversationId).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      for (const [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log("Socket disconnected:", socket.id);
    });
  });
}

module.exports = { setupMessageSocket };
