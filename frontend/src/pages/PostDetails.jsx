import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import CommentCard from "../components/CommentCard";
import { useAuth } from "../context/AuthContext";

export default function PostDetails() {
  const { postId } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/posts/${postId}`);
      setPost(res.data);
    };

    const fetchComments = async () => {
      const res = await axios.get(`/comments/${postId}`);
      setComments(res.data);
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleComment = async () => {
    if (!newComment.trim()) return;
    const res = await axios.post("/comments", {
      postId,
      text: newComment,
    });
    setComments((prev) => [...prev, res.data]);
    setNewComment("");
  };

  if (!post) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border-l-4 border-teal-400 mb-6">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">{post.title}</h2>
        <p className="text-gray-200">{post.content}</p>
        <div className="flex justify-between mt-4">
          <span className="text-amber-400 font-semibold">{post.author.username}</span>
          <span className="text-teal-300 font-bold">{post.upvotes.length} 👍</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-amber-400 mb-2">Comments</h3>
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
        </div>
      </div>

      {user && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <button
            onClick={handleComment}
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition shadow-lg"
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
}