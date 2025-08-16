import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { text, postId, parentCommentId } = req.body;
    const newComment = new Comment({
      text,
      author: req.session.userId,
      post: postId,
      parentComment: parentCommentId || null,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const voteComment = async (req, res) => {
  try {
    const { commentId, type } = req.body;
    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (type === "up") {
      comment.upvotes.addToSet(req.session.userId);
      comment.downvotes.pull(req.session.userId);
    } else if (type === "down") {
      comment.downvotes.addToSet(req.session.userId);
      comment.upvotes.pull(req.session.userId);
    }

    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};