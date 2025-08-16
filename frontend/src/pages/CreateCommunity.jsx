import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function CreateCommunity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError("You must be logged in to create a community");
      return;
    }

    if (!name.trim() || !description.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/communities", {
        name: name.trim(),
        description: description.trim()
      });
      
      // Navigate to the newly created community
      navigate(`/community/${response.data._id}`);
    } catch (err) {
      console.error("Failed to create community:", err);
      setError(err.response?.data?.message || "Failed to create community. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-3xl shadow-xl text-center">
          <h1 className="text-2xl font-bold text-purple-400 mb-4">Authentication Required</h1>
          <p className="text-gray-200 mb-6">You need to be logged in to create a community.</p>
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
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 p-8 rounded-3xl shadow-xl border-l-4 border-purple-400">
          <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">
            Create New Community
          </h1>
          
          {error && (
            <div className="bg-red-600 text-white p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-amber-400 font-semibold mb-2">
                Community Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter community name"
                className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-amber-400 font-semibold mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your community"
                rows="4"
                className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none"
                disabled={loading}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 py-3 px-6 rounded-xl bg-gray-600 hover:bg-gray-500 transition shadow-lg"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Community"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
