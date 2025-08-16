import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosInstance";
import PostCard from "../components/PostCard";

export default function Profile() {
  const { user, loading: authLoading, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;
      
      setPostsLoading(true);
      setError("");
      
      try {
        // Try both user.id and user._id to be safe
        const userId = user.id || user._id;
        const res = await axios.get(`/posts/user/${userId}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch user posts:", err);
        setError("Failed to load your posts. Please try again.");
      } finally {
        setPostsLoading(false);
      }
    };
    
    fetchUserPosts();
  }, [user]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate("/"); // Redirect to home after logout
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  // Loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-3xl shadow-xl text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-purple-400 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-200">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-3xl shadow-xl text-center">
          <h1 className="text-2xl font-bold text-purple-400 mb-4">Access Denied</h1>
          <p className="text-gray-200 mb-6">You need to be logged in to view your profile.</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-500 transition shadow-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Profile Header */}
      <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border-l-4 border-amber-400 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-purple-400 mb-2">{user.username}</h1>
            <p className="text-gray-200 mb-4">Welcome to your profile!</p>
            <div className="flex gap-4 text-sm text-gray-300">
              <span>📧 {user.email}</span>
              <span>📅 Member since {new Date().getFullYear()}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loggingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h3 className="text-xl font-bold text-amber-400 mb-4">Your Posts</h3>
        
        {error && (
          <div className="bg-red-600 text-white p-4 rounded-xl mb-6">
            {error}
          </div>
        )}
        
        {postsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 p-5 rounded-2xl animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 p-8 rounded-3xl shadow-xl text-center border-l-4 border-teal-400">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-teal-300 mb-2">No Posts Yet</h3>
            <p className="text-gray-200 mb-6">You haven't created any posts yet. Start sharing your thoughts!</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-teal-600 rounded-xl hover:bg-teal-500 transition shadow-lg"
            >
              Explore Communities
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
