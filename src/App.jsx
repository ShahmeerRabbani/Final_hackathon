import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

// Helper to get token
const getToken = async () => {
  return localStorage.getItem("authToken");
};

// Helper to save token
const saveToken = async (token) => {
  localStorage.setItem("authToken", token);
};

// Helper to remove token
const removeToken = async () => {
  localStorage.removeItem("authToken");
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check token on app load
  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        setUser({ token }); // store token as user object
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  // Login function
  const handleLogin = async (token) => {
    await saveToken(token);
    setUser({ token });
  };

  // Logout function
  const handleLogout = async () => {
    await removeToken();
    setUser(null);
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        {!user && <Route path="/login" element={<SignIn onLogin={handleLogin} />} />}
        {!user && <Route path="/signup" element={<SignUp onSignup={handleLogin} />} />}
        {!user && <Route path="*" element={<Navigate to="/login" />} />}

        {/* Protected routes */}
        {user && <Route path="/" element={<Home />} />}
        {user && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
}