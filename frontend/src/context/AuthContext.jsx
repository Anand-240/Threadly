import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, username }
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me"); // backend route to get current user
        setUser(res.data.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    setUser(res.data.user);
    return res;
  };

  const signup = async (username, email, password) => {
    const res = await axios.post("/auth/signup", { username, email, password });
    return res;
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};