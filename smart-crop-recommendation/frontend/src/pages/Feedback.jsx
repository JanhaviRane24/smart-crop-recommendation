import React, { useState } from "react";
import "../styles/Feedback.css";

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  const feedback = { name, email, message };
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    });
    if (res.ok) {
      setStatus("Feedback submitted successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("Something went wrong!");
      setTimeout(() => setStatus(""), 3000);
    }
  } catch (error) {
    setStatus("Server error!");
    setTimeout(() => setStatus(""), 3000);
  }
};

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h2 className="feedback-title">Feedback Form</h2>

        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            className="feedback-input"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="feedback-input"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            className="feedback-textarea"
            placeholder="Your Message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="feedback-btn">
            Submit
          </button>
        </form>

        {status && <p className="feedback-status">{status}</p>}
      </div>
    </div>
  );
}
