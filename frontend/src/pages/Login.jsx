import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(email.trim(), password);
      navigate("/"); // Redirect to home page after successful login
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-gray-800 p-10 rounded-3xl shadow-lg w-96" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">Login</h1>
        
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          disabled={loading}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl mb-6 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          disabled={loading}
        />
        <button 
          type="submit"
          className="w-full bg-purple-600 py-3 rounded-xl hover:bg-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 transition">
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
