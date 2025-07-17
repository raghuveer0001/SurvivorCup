import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaCalendarAlt, FaStar, FaPlay, FaUserEdit } from "react-icons/fa";

export default function DashboardHome() {
  const navigate = useNavigate();

  const username = "PlayerOne";
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [sendingStatus, setSendingStatus] = useState(null); // null, "sending", "success", "error"

  // Improved Fade-in animation on scroll handler
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".fade-in-on-scroll").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        } else {
          el.classList.remove("visible");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample data
  const overviewStats = [
    { icon: <FaTrophy size={28} color="#ff4b2b" />, label: "Tournaments Joined", value: 12 },
    { icon: <FaCalendarAlt size={28} color="#ff4b2b" />, label: "Upcoming Matches", value: 3 },
    { icon: <FaStar size={28} color="#ff4b2b" />, label: "Current Rank", value: "Gold III" },
  ];

  const upcomingMatches = [
    { id: 1, title: "Free Fire Weekend Cup", date: "July 15, 2025", entryFee: "₹200", status: "Open" },
    { id: 2, title: "PUBG Mobile Royale", date: "July 20, 2025", entryFee: "₹199.98", status: "Open" },
    { id: 3, title: "Valorant Monthly", date: "July 25, 2025", entryFee: "₹599", status: "Registration Closing Soon" },
  ];

  const recentActivities = [
    "You joined 'Free Fire Weekend Cup'.",
    "You won ₹500 in 'PUBG Mobile Royale'.",
    "Match started for 'PUBG Weekly'.",
    "Match started for 'FreeFire Weekly'.",
  ];

  const policies = [
    {
      title: "Privacy Policy",
      desc: "We value your privacy and ensure that your personal information remains secure. The data collected is used solely for order processing and service improvement. We do not share your details with third parties without your consent.",
    },
    {
      title: "Cancellations and Refunds",
      desc: "Joined tournaments can be canceled up to one hour before the match starts. Refunds are processed instantly after cancellation.",
    },
    {
      title: "Terms and Conditions",
      desc: "By using our website, you agree to comply with our terms and conditions. All purchases are subject to availability, and prices may change without prior notice.",
    },
    {
      title: "Shipping Policy",
      desc: "We offer tournament participation across India. Withdrawal amounts are processed within 1 to 7 days. Tracking details will be provided once the withdrawal is initiated.",
    },
  ];

  // Contact form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setSendingStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setSendingStatus("success");
      setContactForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      setSendingStatus("error");
    }
  };

  return (
    <div style={{
      maxWidth: 1200,
      margin: "0 auto",
      padding: "2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#f0f0f0"
    }}>
      {/* Welcome + Date */}
      <header style={{ marginBottom: 30, textAlign: "center" }}>
        <h1 style={{ fontSize: "2.75rem", fontWeight: 900, marginBottom: 4 }}>
          Welcome back, <span style={{ color: "#ff4b2b" }}>{username}</span>!
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#ddd" }}>{today}</p>
      </header>

      {/* Notification Banner */}
      <div style={{
        background: "#ff4b2b",
        padding: "0.75rem 1.5rem",
        borderRadius: 8,
        marginBottom: 40,
        fontWeight: "600",
        textAlign: "center",
        color: "#fff",
        boxShadow: "0 0 15px rgba(255, 75, 43, 0.7)"
      }}>
        🔔 Reminder: Registration closes for PUBG Weekly in 2 days! Hurry up!
      </div>

      {/* Overview Cards */}
      <section style={{
        display: "flex",
        gap: "1.75rem",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 40
      }}>
        {overviewStats.map(({ icon, label, value }) => (
          <div
            key={label}
            style={{
              background: "#1c1c29",
              borderRadius: 14,
              padding: "2rem 2.5rem",
              minWidth: 190,
              flex: "1 1 190px",
              boxShadow: "0 0 18px rgba(255, 75, 43, 0.7)",
              textAlign: "center",
              cursor: "default",
              userSelect: "none",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            <div style={{ marginBottom: 15 }}>{icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: "1.3rem", marginBottom: 12 }}>{label}</h3>
            <p style={{ fontWeight: 600, fontSize: "1.85rem", color: "#ff4b2b", margin: 0 }}>{value}</p>
          </div>
        ))}
      </section>

      {/* Upcoming Matches */}
      <section style={{ marginBottom: 50 }}>
        <h2 style={{ fontWeight: 800, fontSize: "1.9rem", marginBottom: 20, color: "#ff4b2b" }}>
          Upcoming Matches
        </h2>
        <ul style={{ listStyle: "none", padding: 0, maxWidth: 900, margin: "0 auto" }}>
          {upcomingMatches.map(({ id, title, date, entryFee, status }) => (
            <li
              key={id}
              style={{
                background: "#1c1c29",
                borderRadius: 10,
                padding: "1rem 1.5rem",
                marginBottom: 12,
                boxShadow: "0 0 10px rgba(255, 75, 43, 0.5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#ff4b2b"}
              onMouseLeave={e => e.currentTarget.style.background = "#1c1c29"}
            >
              <div>
                <h3 style={{ margin: 0, fontWeight: 700, fontSize: "1.25rem" }}>{title}</h3>
                <small style={{ color: "#ccc" }}>{date} &mdash; Entry Fee: {entryFee}</small>
              </div>
              <div style={{ fontWeight: "700", color: status.includes("Closing") ? "#ffc107" : "#fff" }}>
                {status}
              </div>
            </li>
          ))}
        </ul>
        <div style={{ textAlign: "center", marginTop: 15 }}>
          <button
            style={{
              background: "#ff4b2b",
              border: "none",
              color: "white",
              padding: "0.7rem 2.5rem",
              fontWeight: "700",
              fontSize: "1.1rem",
              borderRadius: 50,
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(255, 75, 43, 0.7)",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#ff5a3c"}
            onMouseLeave={e => e.currentTarget.style.background = "#ff4b2b"}
            onClick={() => navigate("/dashboard/mytournaments")}
          >
            View All Tournaments
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section style={{ marginBottom: 50, maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 800, fontSize: "1.9rem", marginBottom: 20, color: "#ff4b2b" }}>
          Recent Activity
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {recentActivities.map((item, idx) => (
            <li
              key={idx}
              style={{
                background: "#1c1c29",
                borderRadius: 10,
                padding: "1rem 1.5rem",
                marginBottom: 12,
                boxShadow: "0 0 10px rgba(255, 75, 43, 0.5)",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Quick Actions */}
      <section style={{
        display: "flex",
        justifyContent: "center",
        gap: "1.5rem",
        flexWrap: "wrap",
        maxWidth: 900,
        margin: "0 auto",
        marginBottom: "3rem",
      }}>
        <button
          style={actionBtnStyle}
          onClick={() => navigate("/dashboard/mytournaments")}
        >
          <FaPlay style={{ marginRight: 8 }} />
          Join New Tournament
        </button>
        <button
          style={actionBtnStyle}
          onClick={() => navigate("/dashboard/leaderboard")}
        >
          <FaTrophy style={{ marginRight: 8 }} />
          View Leaderboard
        </button>
        <button
          style={actionBtnStyle}
          onClick={() => navigate("/dashboard/profile")}
        >
          <FaUserEdit style={{ marginRight: 8 }} />
          Update Profile
        </button>
      </section>

      {/* Payout Section */}
      <section style={{
        maxWidth: 900,
        margin: "0 auto",
        background: "#1c1c29",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(255, 75, 43, 0.6)",
        color: "#fff",
        fontSize: "1.2rem",
        fontWeight: "600",
        lineHeight: 1.6,
        marginBottom: "3rem",
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#ff4b2b",
          fontWeight: "800",
          marginBottom: "1.5rem",
          fontSize: "2rem",
          textShadow: "0 0 10px #ff4b2b"
        }}>
          Payout
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { step: "Step 1", title: "Join Tournaments", desc: "Join for existing tournaments" },
            { step: "Step 2", title: "Prize Distribution", desc: "Prize distribution after the match, directly into the wallet" },
            { step: "Step 3", title: "Redeem Winning Amount", desc: "Redeem the amount won from tournaments (Min.:50, Max.: No Limit)" },
            { step: "Step 4", title: "Bank Transfer", desc: "Payout will be done within 24 hrs" },
          ].map(({ step, title, desc }) => (
            <div key={step} style={{
              display: "flex",
              alignItems: "center",
              background: "#11121a",
              padding: "1rem 1.5rem",
              borderRadius: "10px",
              boxShadow: "0 0 12px #00f0ff",
            }}>
              <div style={{
                flexShrink: 0,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00f0ff, #004dff)",
                color: "#fff",
                fontWeight: "700",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "1.25rem",
                boxShadow: "0 0 10px #00f0ff",
              }}>
                {step}
              </div>
              <div>
                <h3 style={{ margin: 0, fontWeight: "700", fontSize: "1.25rem" }}>{title}</h3>
                <p style={{ margin: 0, color: "#bbb" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section style={{
        maxWidth: 900,
        margin: "0 auto",
        background: "#1c1c29",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(255, 75, 43, 0.6)",
        color: "#fff",
        fontSize: "1.2rem",
        fontWeight: "600",
        lineHeight: 1.6,
        marginBottom: "3rem",
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#ff4b2b",
          fontWeight: "800",
          marginBottom: "1.5rem",
          fontSize: "2rem",
          textShadow: "0 0 10px #ff4b2b"
        }}>
          Contact Us
        </h2>

        <form onSubmit={handleSendMessage} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={contactForm.firstName}
              onChange={handleInputChange}
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={contactForm.lastName}
              onChange={handleInputChange}
              required
              style={inputStyle}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={contactForm.email}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={contactForm.message}
            onChange={handleInputChange}
            required
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
          />
          <button
            type="submit"
            disabled={sendingStatus === "sending"}
            style={{
              ...actionBtnStyle,
              alignSelf: "flex-start",
              padding: "0.85rem 2rem",
              fontSize: "1.1rem",
              opacity: sendingStatus === "sending" ? 0.7 : 1,
              cursor: sendingStatus === "sending" ? "not-allowed" : "pointer",
              boxShadow: "0 0 20px #ff4b2b",
            }}
          >
            {sendingStatus === "sending" ? "Sending..." : "Send message"}
          </button>

          {sendingStatus === "success" && (
            <p style={{ color: "#0f0", marginTop: "0.5rem" }}>Message sent successfully!</p>
          )}
          {sendingStatus === "error" && (
            <p style={{ color: "#f00", marginTop: "0.5rem" }}>Failed to send message. Please try again.</p>
          )}
        </form>
      </section>

      {/* Policies Section */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto 5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {policies.map(({ title, desc }) => (
          <div
            key={title}
            className="fade-in-on-scroll"
            style={{
              background: "#22242e",
              padding: "2rem 2.5rem",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              color: "#9f7aea",
              fontWeight: 600,
              lineHeight: 1.6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              opacity: 1,
              transform: "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <h3 style={{
              fontWeight: 900,
              fontSize: "1.75rem",
              marginBottom: "1rem",
              color: "#a78bfa",
            }}>
              {title}
            </h3>
            <p style={{
              fontWeight: 500,
              fontSize: "1.1rem",
              color: "#ddd",
              flexGrow: 1,
            }}>
              {desc}
            </p>
          </div>
        ))}
      </section>

      <style>{`
        .fade-in-on-scroll.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}

// Quick action buttons style
const actionBtnStyle = {
  background: "#ff4b2b",
  border: "none",
  color: "white",
  padding: "0.85rem 1.75rem",
  fontWeight: "700",
  fontSize: "1rem",
  borderRadius: 50,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  boxShadow: "0 0 15px rgba(255, 75, 43, 0.7)",
  transition: "background 0.3s ease",
};

// Input style for contact form
const inputStyle = {
  background: "#22222e",
  border: "1px solid #4b3d73",
  borderRadius: 8,
  padding: "0.75rem 1rem",
  color: "#fff",
  fontSize: "1rem",
  fontWeight: "500",
  outline: "none",
  transition: "border-color 0.3s ease",
};
