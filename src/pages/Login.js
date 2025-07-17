import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Login({ onLogin }) {
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with real login logic
    alert(`Login submitted\nEmail: ${email}\nPassword: ${password}`);
    onLogin(); // Set login state in App.js
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${forgotEmail}`);
    setShowForgot(false); // Return to login form after reset
  };

  return (
    <div className="auth-container premium-glass">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {showForgot ? "Forgot Password" : "Login"}
      </motion.h2>

      <AnimatePresence mode="wait">
        {!showForgot ? (
          <motion.form
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleLoginSubmit}
          >
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
              Login
            </motion.button>

            <p className="toggle-text">
              Forgot your password?{" "}
              <span className="toggle-link" onClick={() => setShowForgot(true)}>
                Reset here
              </span>
            </p>
          </motion.form>
        ) : (
          <motion.form
            key="forgot"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleForgotSubmit}
          >
            <input
              type="email"
              placeholder="Enter your registered email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
              className="premium-input"
            />
            <motion.button
              type="submit"
              className="premium-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Reset Link
            </motion.button>

            <p className="toggle-text">
              Remembered your password?{" "}
              <span className="toggle-link" onClick={() => setShowForgot(false)}>
                Login here
              </span>
            </p>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="bottom-text">
        Don't have an account? <Link to="/signup">Signup now</Link>
      </p>
    </div>
  );
}
