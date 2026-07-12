import { useState } from "react";
import { getWeather } from "../api/weather.js";
import "../styles/Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return setError("Enter a city name");
    setError("");
    setLoading(true);
    setWeather(null);

    try {
      // Fetch weather data from OpenWeatherMap
      const data = await getWeather(city, import.meta.env.VITE_WEATHER_API_KEY); // Make sure you have the API key in .env
      console.log("Weather data:", data);  // Optional: log the data to verify
      setWeather(data);

      // Send city name to backend to save in the database
      await saveCityToBackend(city);
    } catch (err) {
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  // Function to send city to backend
  const saveCityToBackend = async (city) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/save-city/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }),  // Sending only the city name
    });
    const result = await response.json();
    console.log("Saved city:", result);  // Log the response to see the backend result
  } catch (err) {
    console.error("Error saving city:", err);
  }
};

  const getWeatherIcon = (desc) => {
    if (!desc) return "🌤";
    desc = desc.toLowerCase();
    if (desc.includes("cloud")) return "☁️";
    if (desc.includes("rain")) return "🌧";
    if (desc.includes("storm")) return "⛈";
    if (desc.includes("clear")) return "☀️";
    if (desc.includes("snow")) return "❄️";
    if (desc.includes("wind")) return "🌬️";
    if (desc.includes("mist") || desc.includes("fog")) return "🌫️";
    return "🌡️";
  };

  return (
    <main className="weather-wrapper" aria-labelledby="weather-title">
      <div className="weather-card">
        <h1 id="weather-title">☁️ Weather Forecast</h1>

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {weather?.weather?.[0] && (
        <div className="result-card">
          <h3>
            {getWeatherIcon(weather.weather[0].description)} {weather.name}
          </h3>

          <div className="info-grid">
            <div className="info-item">
              <span className="icon">🌡️</span>
              <p><b>Temp:</b> {weather.main.temp}°C</p>
            </div>
            <div className="info-item">
              <span className="icon">💧</span>
              <p><b>Humidity:</b> {weather.main.humidity}%</p>
            </div>
            <div className="info-item">
              <span className="icon">🌬️</span>
              <p><b>Wind:</b> {weather.wind.speed} m/s</p>
            </div>
            <div className="info-item">
              <span className="icon">☁️</span>
              <p><b>Condition:</b> {weather.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
