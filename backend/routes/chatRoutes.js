import express from "express";
import { getMessages } from "../controllers/chatController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get chat messages for a community
router.get("/:communityId", isAuthenticated, getMessages);

export default router;