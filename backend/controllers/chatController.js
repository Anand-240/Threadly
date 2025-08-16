import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const { communityId } = req.params;
    const messages = await Message.find({ community: communityId })
      .populate("author", "username")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};