import React, { useState } from "react";

// Mock user data with badges, notifications, and email verification
const mockUserData = {
  name: "John Doe",
  email: "john@example.com",
  freeFireId: "FF_John123",
  pubgId: "PUBG_John456",
  emailVerified: false, // email verification status
  stats: {
    matchesPlayed: 45,
    wins: 12,
    points: 1890,
  },
  tournamentHistory: [
    {
      id: "t1",
      name: "Summer Free Fire Blast",
      game: "Free Fire",
      position: 2,
      prize: "₹15,000",
    },
    {
      id: "t2",
      name: "PUBG Battle Royale",
      game: "PUBG",
      position: 5,
      prize: "₹7,000",
    },
  ],
  achievements: [
    { id: "a1", title: "Top 10 Player", description: "Reached top 10 in PUBG tournament" },
    { id: "a2", title: "Sharp Shooter", description: "Most headshots in Free Fire tournament" },
  ],
  notifications: [
    { id: "n1", text: "Your password will expire in 5 days." },
    { id: "n2", text: "New tournament registration opens tomorrow!" },
  ],
};

export default function Profile() {
  const [userData, setUserData] = useState(mockUserData);
  const [editMode, setEditMode] = useState(false);
  const [changePassMode, setChangePassMode] = useState(false);
  const [form, setForm] = useState({
    name: userData.name,
    email: userData.email,
    freeFireId: userData.freeFireId,
    pubgId: userData.pubgId,
  });

  // Password change form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Email verification resend status
  const [verificationSent, setVerificationSent] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle password change input changes
  const handlePasswordChange = (e) => {
    setPasswordForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Save profile changes
  const handleSave = (e) => {
    e.preventDefault();
    setUserData((prev) => ({
      ...prev,
      name: form.name,
      email: form.email,
      freeFireId: form.freeFireId,
      pubgId: form.pubgId,
    }));
    setEditMode(false);
    alert("Profile updated!");
  };

  // Handle logout
  const handleLogout = () => {
    alert("Logged out!");
    // Add logout logic here (redirect, clear tokens, etc)
  };

  // Submit password change
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    // Mock password change success
    alert("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setChangePassMode(false);
  };

  // Resend verification email
  const resendVerificationEmail = () => {
    // Mock async resend
    setVerificationSent(true);
    setTimeout(() => {
      alert("Verification email sent!");
      setVerificationSent(false);
    }, 1500);
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      {!editMode && !changePassMode && (
        <>
          <section className="profile-info">
            <h2>User Info</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Free Fire ID:</strong> {userData.freeFireId}</p>
            <p><strong>PUBG ID:</strong> {userData.pubgId}</p>
            <p>
              <strong>Email Verified:</strong>{" "}
              {userData.emailVerified ? (
                <span style={{ color: "lightgreen" }}>Yes ✔</span>
              ) : (
                <>
                  <span style={{ color: "#ff4b2b" }}>No ✘</span>{" "}
                  <button
                    onClick={resendVerificationEmail}
                    disabled={verificationSent}
                    style={{
                      background: "#ff4b2b",
                      color: "white",
                      border: "none",
                      padding: "5px 12px",
                      borderRadius: "8px",
                      cursor: verificationSent ? "wait" : "pointer",
                      marginLeft: "10px",
                    }}
                  >
                    {verificationSent ? "Sending..." : "Resend Email"}
                  </button>
                </>
              )}
            </p>
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
            <button
              className="edit-btn"
              style={{ marginLeft: "1rem", backgroundColor: "#555" }}
              onClick={() => setChangePassMode(true)}
            >
              Change Password
            </button>
          </section>

          <section className="profile-stats">
            <h2>Stats</h2>
            <div className="stats-cards">
              <div className="stat-card">
                <h3>{userData.stats.matchesPlayed}</h3>
                <p>Matches Played</p>
              </div>
              <div className="stat-card">
                <h3>{userData.stats.wins}</h3>
                <p>Wins</p>
              </div>
              <div className="stat-card">
                <h3>{userData.stats.points}</h3>
                <p>Points</p>
              </div>
            </div>
          </section>

          <section className="achievements">
            <h2>Achievements / Badges</h2>
            <ul>
              {userData.achievements.map((a) => (
                <li key={a.id} className="achievement-item">
                  <strong>{a.title}:</strong> {a.description}
                </li>
              ))}
            </ul>
          </section>

          <section className="recent-activity">
            <h2>Recent Notifications</h2>
            <ul>
              {userData.notifications.map((n) => (
                <li key={n.id} className="notification-item">
                  {n.text}
                </li>
              ))}
            </ul>
          </section>

          <section className="tournament-history">
            <h2>Tournament History</h2>
            <table>
              <thead>
                <tr>
                  <th>Tournament</th>
                  <th>Game</th>
                  <th>Position</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                {userData.tournamentHistory.map((t) => (
                  <tr key={t.id}>
                    <td>{t.name}</td>
                    <td>{t.game}</td>
                    <td>{t.position}</td>
                    <td>{t.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}

      {editMode && (
        <form className="edit-form" onSubmit={handleSave}>
          <h2>Edit Profile</h2>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Free Fire ID
            <input
              type="text"
              name="freeFireId"
              value={form.freeFireId}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            PUBG ID
            <input
              type="text"
              name="pubgId"
              value={form.pubgId}
              onChange={handleChange}
              required
            />
          </label>
          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {changePassMode && (
        <form className="edit-form" onSubmit={handlePasswordSubmit}>
          <h2>Change Password</h2>
          <label>
            Current Password
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <label>
            New Password
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <label>
            Confirm New Password
            <input
              type="password"
              name="confirmNewPassword"
              value={passwordForm.confirmNewPassword}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <div className="form-buttons">
            <button type="submit">Change Password</button>
            <button type="button" onClick={() => setChangePassMode(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
