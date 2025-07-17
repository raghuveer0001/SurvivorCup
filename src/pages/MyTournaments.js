import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const gameImages = {
  freefire: "/SurvivorCup/freefire.png",
  pubg: "/SurvivorCup/bgmi.webp",
};

// Generate 7 days tournament data for each game with 6 PM start time
const generateWeeklyTournaments = (gameKey) => {
  const gamesFullName = { freefire: "Free Fire", pubg: "PUBG" };
  const baseDate = new Date("2025-08-01T18:00:00"); // 6 PM start date

  return Array(7)
    .fill(0)
    .map((_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      const formattedDate = date.toISOString().slice(0, 10);
      return {
        id: `${gameKey}-tourney-${i + 1}`,
        name: `${gamesFullName[gameKey]} Tournament Day ${i + 1}`,
        game: gameKey,
        date: formattedDate,
        time: "18:00",
        mode: "Squads & Solo",
        map: ["Bermuda", "Erangel", "Kalahari", "Miramar", "Sanhok", "Vikendi", "Purgatory"][i],
        prize: `₹${20_000 }`, // Increasing prize every day
      };
    });
};

// Merge tournaments of both games
const tournamentsData = [
  ...generateWeeklyTournaments("freefire"),
  ...generateWeeklyTournaments("pubg"),
];

// Game Selection Component
function GameSelect() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "2rem" }}
      >
        Select a Game to View Tournaments
      </motion.h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "4rem",
          cursor: "pointer",
        }}
      >
        {Object.entries(gameImages).map(([gameKey, imgSrc]) => (
          <motion.img
            key={gameKey}
            src={imgSrc}
            alt={gameKey}
            onClick={() => navigate(gameKey)}
            whileHover={{ scale: 1.1 }}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "20px",
              border: "4px solid transparent",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Game Tournaments Listing Component
function GameTournaments() {
  const { game } = useParams();
  const navigate = useNavigate();

  const filteredTournaments = tournamentsData.filter((t) => t.game === game);

  // Register function simulating registration
  const handleRegister = (tournamentName, type) => {
    alert(`Registered for ${tournamentName} as ${type}!`);
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxHeight: "75vh",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "#ff4b2b transparent",
      }}
    >
      <button
        onClick={() => navigate("/dashboard/mytournaments")}
        style={{
          marginBottom: "1rem",
          background: "#ff4b2b",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
        }}
      >
        ← Back to Game Selection
      </button>

      <h1 style={{ marginBottom: "1rem" }}>
        {game === "freefire" ? "Free Fire" : game === "pubg" ? "PUBG" : game} Tournaments
      </h1>

      {filteredTournaments.length === 0 ? (
        <p
          style={{
            color: "#ff4b2b",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          No tournaments found for this game.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {filteredTournaments.map((t) => (
            <div
              key={t.id}
              style={{
                background: "#1c1c29",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 0 15px rgba(255,75,43,0.7)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <h2 style={{ marginBottom: "0.5rem" }}>{t.name}</h2>
              <p>
                <strong>Game:</strong> {game === "freefire" ? "Free Fire" : "PUBG"}
              </p>
              <p>
                <strong>Date:</strong> {t.date} at {t.time}
              </p>
              <p>
                <strong>Mode:</strong> {t.mode}
              </p>
              <p>
                <strong>Map:</strong> {t.map}
              </p>
              <p>
                <strong>Prize:</strong> {t.prize}
              </p>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button
                  style={{
                    flex: 1,
                    backgroundColor: "#ff4b2b",
                    border: "none",
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "50px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 0 15px rgba(255,75,43,0.7)",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => handleRegister(t.name, "Squad")}
                >
                  Register as Squad
                </button>
                <button
                  style={{
                    flex: 1,
                    backgroundColor: "#ff416c",
                    border: "none",
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "50px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 0 15px rgba(255,65,75,0.7)",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => handleRegister(t.name, "Solo")}
                >
                  Register as Solo
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyTournaments() {
  return (
    <>
      {/* Nested routing outlet */}
      <Outlet />
    </>
  );
}

MyTournaments.GameSelect = GameSelect;
MyTournaments.GameTournaments = GameTournaments;
