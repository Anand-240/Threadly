import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: "" },
  image: { type: String, default: "" },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.model("Post", postSchema);