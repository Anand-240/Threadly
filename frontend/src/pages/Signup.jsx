import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await signup(username.trim(), email.trim(), password);
      setSuccess("Account created successfully! Please log in.");
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-gray-800 p-10 rounded-3xl shadow-lg w-96" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">Sign Up</h1>
        
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-600 text-white p-3 rounded-xl mb-4 text-sm">
            {success}
          </div>
        )}

        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-xl mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          disabled={loading}
        />
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
          className="w-full p-3 rounded-xl mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          disabled={loading}
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded-xl mb-6 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          disabled={loading}
        />
        <button 
          type="submit"
          className="w-full bg-purple-600 py-3 rounded-xl hover:bg-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 transition">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
