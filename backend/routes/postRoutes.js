import express from "express";
import { createPost, getPostsByCommunity, votePost } from "../controllers/postController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a post
router.post("/", isAuthenticated, createPost);

// Get posts by community
router.get("/:communityId", getPostsByCommunity);

// Upvote/Downvote a post
router.post("/vote", isAuthenticated, votePost);

export default router;