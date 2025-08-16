import Community from "../models/Community.js";

export const createCommunity = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCommunity = new Community({
      name,
      description,
      createdBy: req.session.userId,
      moderators: [req.session.userId]
    });
    await newCommunity.save();
    res.status(201).json(newCommunity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};