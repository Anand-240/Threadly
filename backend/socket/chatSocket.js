import Message from "../models/Message.js";

const chatSocket = (io, sessionMiddleware) => {
  // Use same session for socket
  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // Join a community chat room
    socket.on("joinCommunity", (communityId) => {
      socket.join(communityId);
      console.log(`📢 User joined community room: ${communityId}`);
    });

    // Handle sending a message
    socket.on("sendMessage", async ({ communityId, text, userId }) => {
      if (!text.trim()) return;

      // Save message in DB
      const newMessage = new Message({
        text,
        author: userId,
        community: communityId,
      });
      await newMessage.save();

      // Broadcast to everyone in the community room
      io.to(communityId).emit("receiveMessage", {
        text,
        userId,
        communityId,
        createdAt: newMessage.createdAt,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

export default chatSocket;