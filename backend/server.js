import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import chatSocket from "./socket/chatSocket.js";

dotenv.config();
connectDB();

const app = express();

// CORS middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true // allow cookies
}));

app.use(express.json());

// Session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
});
app.use(sessionMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/chat", chatRoutes);

// Create HTTP server for socket.io
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true }, // frontend origin
});

// Chat socket logic
chatSocket(io, sessionMiddleware);

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));