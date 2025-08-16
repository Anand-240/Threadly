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
    socket.on("sendMessage", async (messageData) => {
      const { communityId, text, userId, timestamp } = messageData;
      
      if (!text.trim()) return;

      try {
        // Save message in DB
        const newMessage = new Message({
          text,
          author: userId,
          community: communityId,
        });
        await newMessage.save();

        // Broadcast to everyone in the community room (including sender)
        io.to(communityId).emit("receiveMessage", {
          text,
          userId,
          communityId,
          timestamp: newMessage.createdAt.toISOString(), // Use DB timestamp
        });
        
        console.log(`💬 Message sent in community ${communityId}: "${text}"`);        
      } catch (error) {
        console.error("❌ Error sending message:", error);
        socket.emit("messageError", { error: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

export default chatSocket;