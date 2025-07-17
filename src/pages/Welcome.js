import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to the Ultimate Free Fire & PUBG Tournament
      </motion.h1>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Compete with the best, win amazing prizes!
      </motion.p>

      <motion.div
        className="logos"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <img src="/SurvivorCup/freefire.png" alt="Free Fire" />
        <img src="/SurvivorCup/bgmi.webp" alt="PUBG" />
      </motion.div>

      <motion.button
        className="get-started-btn"
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px #ff4b2b" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/login")}
      >
        Get Started
      </motion.button>
    </div>
  );
}
