import React from "react";
import { motion } from "framer-motion";

const dummyData = [
  { id: 1, name: "Team Alpha", points: 1500, wins: 12, matches: 20 },
  { id: 2, name: "PlayerX", points: 1450, wins: 10, matches: 18 },
  { id: 3, name: "Squad Rocket", points: 1400, wins: 11, matches: 19 },
  { id: 4, name: "Gamer Pro", points: 1380, wins: 9, matches: 17 },
  { id: 5, name: "The Destroyers", points: 1350, wins: 8, matches: 16 },
  { id: 6, name: "Ace Hunters", points: 1300, wins: 7, matches: 15 },
  { id: 7, name: "Ninja Squad", points: 1280, wins: 7, matches: 15 },
  { id: 8, name: "Flash Players", points: 1250, wins: 6, matches: 14 },
  { id: 9, name: "Shadow Kings", points: 1220, wins: 5, matches: 13 },
  { id: 10, name: "Elite Force", points: 1200, wins: 5, matches: 12 },
];

// Simulate logged-in user ID
const loggedInUserId = 4;

export default function Leaderboard() {
  const data = dummyData;

  return (
    <div className="leaderboard-container">
      <motion.h1
        className="leaderboard-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Tournament Leaderboard
      </motion.h1>

      <motion.table
        className="leaderboard-table"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player/Team</th>
            <th>Points</th>
            <th>Wins</th>
            <th>Matches</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player, index) => {
            const isUser = player.id === loggedInUserId;
            return (
              <motion.tr
                key={player.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={isUser ? "highlight-row" : ""}
              >
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.points}</td>
                <td>{player.wins}</td>
                <td>{player.matches}</td>
              </motion.tr>
            );
          })}
        </tbody>
      </motion.table>
    </div>
  );
}
