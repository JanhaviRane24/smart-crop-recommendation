import { useState } from "react";
import { getRecommendation } from "../api/recommendation.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Recommendation.css";
import { Link } from "react-router-dom";

export default function Recommendation() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    nitrogen: "", phosphorus: "", potassium: "",
    temperature: "", humidity: "", ph: "", rainfall: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await getRecommendation(formData, token);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch recommendation");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Nitrogen", name: "nitrogen" },
    { label: "Phosphorus", name: "phosphorus" },
    { label: "Potassium", name: "potassium" },
    { label: "Temperature (°C)", name: "temperature" },
    { label: "Humidity (%)", name: "humidity" },
    { label: "pH Level", name: "ph" },
    { label: "Rainfall (mm)", name: "rainfall" }
  ];

  return (
    <main className="recommend-wrapper" aria-labelledby="recommend-title">
      
      <div className="card input-card">
        <h2 id="recommend-title" className="title">🌾 Crop Input Form</h2>

        <form onSubmit={handleSubmit} aria-label="Crop Recommendation Form">
          {fields.map(f => (
            <div className="form-group" key={f.name}>
              <label htmlFor={f.name}>{f.label} *</label>
              <input
                id={f.name}
                type="number"
                name={f.name}
                value={formData[f.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {error && (
            <p className="error" role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <div className="btn-group">
            <button type="submit" className="submit-btn" aria-label="Get Crop Recommendation">
              {loading ? "Loading..." : "Get Recommendation"}
            </button>

            <Link to="/farmer-guide" className="guide-link" aria-label="Go to soil details">
              Find Soil Details
            </Link>
          </div>
        </form>
      </div>

      <div 
        className="card result-card" 
        aria-live="polite" 
        aria-label="Crop Recommendation Result"
      >
        {result ? (
          <>
            <h1>🌱 Recommendation</h1>

            <h3>🌾 Recommended Crop</h3>
            <p className="crop-name">{result.crop}</p>

            <h3>💡 Fertilizer Suggestion</h3>
            <p className="fertilizer">{result.fertilizer}</p>
          </>
        ) : (
          <p className="placeholder-text">Results will appear here after submission</p>
        )}
      </div>
    </main>
  );
}
