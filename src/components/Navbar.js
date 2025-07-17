import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}>SurvivorCup</div>
      <ul style={ulStyle}>
        <li><NavLink to="/dashboard" style={navLinkStyle} end>Home</NavLink></li>
        <li><NavLink to="/dashboard/mytournaments" style={navLinkStyle}>Tournaments</NavLink></li>
        <li><NavLink to="/dashboard/leaderboard" style={navLinkStyle}>Leaderboard</NavLink></li>
        <li><NavLink to="/dashboard/profile" style={navLinkStyle}>Profile</NavLink></li>
      </ul>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#11121a",
  padding: "1rem 2rem",
  color: "white",
  fontWeight: "600",
};

const logoStyle = {
  fontSize: "1.5rem",
  fontWeight: "900",
  color: "#ff4b2b",
};

const ulStyle = {
  listStyle: "none",
  display: "flex",
  gap: "2rem",
  margin: 0,
  padding: 0,
};

const navLinkStyle = ({ isActive }) => ({
  color: isActive ? "#ff4b2b" : "#bbb",
  fontWeight: isActive ? "700" : "600",
  textDecoration: "none",
  borderBottom: isActive ? "2px solid #ff4b2b" : "none",
  paddingBottom: "2px",
  fontSize: "1.1rem",
});
