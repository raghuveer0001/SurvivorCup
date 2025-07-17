import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import MyTournaments from "./pages/MyTournaments"; // game selection + tournaments listing
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      {/* Welcome page */}
      <Route path="/" element={<Welcome />} />

      {/* Auth pages */}
      <Route
        path="/login"
        element={<Login onLogin={() => setIsLoggedIn(true)} />}
      />
      <Route
        path="/signup"
        element={<Signup onSignup={() => setIsLoggedIn(true)} />}
      />

      {/* Protected dashboard */}
      <Route
        path="/dashboard/*"
        element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" replace />}
      >
        {/* Nested routes under dashboard */}
        <Route index element={<DashboardHome />} />

        {/* MyTournaments nested routes */}
        <Route path="mytournaments" element={<MyTournaments />}>
          <Route index element={<MyTournaments.GameSelect />} />
          <Route path=":game" element={<MyTournaments.GameTournaments />} />
        </Route>

        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
