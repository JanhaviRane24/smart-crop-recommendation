import "../styles/Homepage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="hero" role="banner" aria-labelledby="hero-title">

      {/* Background overlay ensures WCAG contrast */}
      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="hero-content">
        <h1 id="hero-title">
          Smart Farming Advisory <br /> Platform
        </h1>

        <p>
          Empowering Indian farmers with personalized crop recommendations,
          real-time weather insights, and AI-powered disease detection for
          better harvests.
        </p>

        <div className="hero-buttons">
          <Link
            to="/dashboard"
            className="btn btn-green"
            role="button"
          >
            Get Started →
          </Link>

         
        </div>

       
      </div>
    </main>
  );
}
