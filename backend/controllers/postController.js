import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, communityId } = req.body;
    const newPost = new Post({
      title,
      content,
      community: communityId,
      author: req.session.userId,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostsByCommunity = async (req, res) => {
  try {
    const posts = await Post.find({ community: req.params.communityId })
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const votePost = async (req, res) => {
  try {
    const { postId, type } = req.body; // type = "up" or "down"
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (type === "up") {
      post.upvotes.addToSet(req.session.userId);
      post.downvotes.pull(req.session.userId);
    } else if (type === "down") {
      post.downvotes.addToSet(req.session.userId);
      post.upvotes.pull(req.session.userId);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};