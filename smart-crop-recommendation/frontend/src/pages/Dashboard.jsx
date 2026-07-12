import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getRecommendation } from "../api/recommendation.js";
import { detectPest } from "../api/detection.js";
import { getWeather } from "../api/weather.js";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { token } = useAuth();

  const [recommendations, setRecommendations] = useState("Loading...");
  const [pestAlert, setPestAlert] = useState("Loading...");
  const [weather, setWeather] = useState("Loading...");

  useEffect(() => {
    if (!token) return;

    // Crop recommendations
    getRecommendation({}, token)
      .then((res) =>
        setRecommendations(res.recommendation || "No recommendations available")
      )
      .catch(() => setRecommendations("Unable to fetch recommendations"));

    // Pest alert placeholder
    setPestAlert("Upload an image to detect pests");

    // Weather info
    getWeather("Delhi", import.meta.env.VITE_WEATHER_API_KEY)
      .then((res) =>
        setWeather(`${res.main.temp}°C, ${res.weather[0].description}`)
      )
      .catch(() => setWeather("Unable to fetch weather information"));
  }, [token]);

  return (
    <main className="dashboard" aria-labelledby="dashboard-title">
      <h1 id="dashboard-title" className="heading">
        Smart Crop Advisory System
      </h1>
      <p className="subheading">For Small and Marginal Farmers</p>

      <section className="dashboard-grid" aria-label="Main features">
        {/* Weather Monitoring */}
        <article className="dash-card" role="region" aria-labelledby="weather-card">
          <div className="icon" aria-hidden="true">☁️</div>
          <h3 id="weather-card">Weather Monitoring</h3>
          <p>{weather}</p>
          <Link to="/weather" className="card-btn" aria-label="Check Weather">
            Check Weather →
          </Link>
        </article>

        {/* Crop Recommendations */}
        <article className="dash-card" role="region" aria-labelledby="rec-card">
          <div className="icon" aria-hidden="true">🌱</div>
          <h3 id="rec-card">Crop Recommendations</h3>
          <p>{recommendations}</p>
          <Link
            to="/recommendation"
            className="card-btn"
            aria-label="Get Crop Recommendations"
          >
            Get Recommendations →
          </Link>
        </article>

        {/* Pest Detection */}
        <article className="dash-card" role="region" aria-labelledby="pest-card">
          <div className="icon" aria-hidden="true">🐞</div>
          <h3 id="pest-card">Disease / Pest Detection</h3>
          <p>{pestAlert}</p>
          <Link to="/pest-detection" className="card-btn" aria-label="Detect Pest">
            Detect Issues →
          </Link>
        </article>

        {/* Market Prices */}
        <article className="dash-card" role="region" aria-labelledby="market-card">
          <div className="icon" aria-hidden="true">📈</div>
          <h3 id="market-card">Market Prices</h3>
          <p>View today’s mandi / market rates</p>
          <Link to="/market" className="card-btn" aria-label="Check Market Prices">
            Check Market Price →
          </Link>
        </article>
      </section>
    </main>
  );
}
