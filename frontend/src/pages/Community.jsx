import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import socket from "../api/socket";
import ChatBox from "../components/ChatBox";
import PostCard from "../components/PostCard";

export default function Community() {
  const { communityId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/${communityId}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, [communityId]);

  useEffect(() => {
    socket.emit("joinCommunity", communityId);
  }, [communityId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex gap-8">
      <div className="flex-1 space-y-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="w-1/3 bg-gray-800 rounded-3xl p-5 flex flex-col shadow-xl border-l-4 border-purple-400">
        <h3 className="text-2xl font-bold text-amber-400 mb-5">Community Chat</h3>
        <ChatBox communityId={communityId} />
      </div>
    </div>
  );
}