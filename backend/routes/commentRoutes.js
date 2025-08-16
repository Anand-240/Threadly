import express from "express";
import { createComment, getCommentsByPost, voteComment } from "../controllers/commentController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a comment
router.post("/", isAuthenticated, createComment);

// Get comments by post
router.get("/:postId", getCommentsByPost);

// Upvote/Downvote a comment
router.post("/vote", isAuthenticated, voteComment);

export default router;