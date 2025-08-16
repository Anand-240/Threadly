import express from "express";
import { createCommunity, getCommunities } from "../controllers/communityController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new community
router.post("/", isAuthenticated, createCommunity);

// Get all communities
router.get("/", getCommunities);

export default router;