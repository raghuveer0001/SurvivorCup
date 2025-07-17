import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with real signup logic
    alert(`Signup submitted\nUsername: ${username}\nEmail: ${email}`);
    onSignup(); // Set login state in App.js
    navigate("/dashboard"); // Redirect to dashboard after signup
  };

  return (
    <div className="auth-container premium-glass">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Signup
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSignupSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="premium-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="premium-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="premium-input"
        />
        <motion.button
          type="submit"
          className="premium-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Signup
        </motion.button>
      </motion.form>

      <p className="bottom-text">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
