import React from "react";
import "../styles/Footer.css";
import { FaLeaf, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">

        {/* About Section */}
        <div className="footer-section">
          <h3><FaLeaf aria-hidden="true" /> Smart Crop Advisory System</h3>
          <p>Empowering farmers with smart agriculture tools and guidance.</p>
        </div>

        {/* Quick Links Section */}
        <nav className="footer-section" aria-label="Footer Navigation">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/recommendation">Recommendations</Link></li>
            <li><Link to="/pest-detection">Disease Detection</Link></li>
            <li><Link to="/weather">Weather</Link></li>
            <li><Link to="/market">Market Prices</Link></li>
            <li><Link to="/farmer-guide">Farmer Guide</Link></li>
          </ul>
        </nav>

        {/* Social Media Section */}
        <div className="footer-section" aria-label="Social Media Links">
          <h4>Connect</h4>
          <div className="social-icons">
            <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>

      </div>

      <p className="footer-bottom">
        © {new Date().getFullYear()} Smart Crop Advisory System. All Rights Reserved.
      </p>
    </footer>
  );
}
