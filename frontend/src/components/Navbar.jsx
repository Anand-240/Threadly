import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

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

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition">
        Threadly
      </Link>
      
      <div className="flex items-center space-x-6">
        <Link className="hover:text-amber-400 transition" to="/">
          Home
        </Link>
        
        {user ? (
          // Authenticated user navigation
          <>
            <Link className="hover:text-teal-300 transition" to="/profile">
              Profile
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">
                Welcome, <span className="text-amber-400 font-semibold">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loggingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </>
        ) : (
          // Guest user navigation
          <>
            <Link className="hover:text-purple-300 transition" to="/login">
              Login
            </Link>
            <Link 
              className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded-lg transition text-sm"
              to="/signup"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
