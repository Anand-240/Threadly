import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { Link } from "react-router-dom";

export default function Home() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await axios.get("/communities");
        setCommunities(res.data);
      } catch (err) {
        console.error("Failed to fetch communities:", err);
      }
    };
    fetchCommunities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold text-purple-400 mb-8 text-center">
        Explore Communities
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {communities.map((comm) => (
          <Link key={comm._id} to={`/community/${comm._id}`}>
            <div className="bg-gray-800 rounded-3xl p-6 shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-l-4 border-amber-400 hover:border-teal-300">
              <h2 className="text-2xl font-bold text-purple-300 mb-2 hover:text-purple-400 transition-colors">
                {comm.name}
              </h2>
              <p className="text-gray-200">{comm.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-teal-300 font-semibold">
                  {comm.moderators.length} Moderator{comm.moderators.length > 1 ? "s" : ""}
                </span>
                <span className="text-amber-400 font-bold">
                  {comm.posts?.length || 0} Posts
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Add new community button */}
      <div className="mt-12 flex justify-center">
        <Link
          to="/create-community"
          className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-500 transition shadow-lg font-bold text-white"
        >
          + Create New Community
        </Link>
      </div>
    </div>
  );
}