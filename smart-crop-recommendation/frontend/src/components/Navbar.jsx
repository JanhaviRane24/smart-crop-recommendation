import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
     <nav className="navbar" role="navigation" aria-label="Main Navigation">

  {/* Logo */}
  <div className="nav-left">
    <Link to="/" className="logo">SmartCrop</Link>
  </div>

  {/* Hamburger (mobile only) */}
  <div
    className="menu-toggle"
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label="Toggle Menu"
  >
    ☰
  </div>

  {/* Main Links */}
  <ul className={`nav-center ${menuOpen ? "active" : ""}`}>
    <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
    <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
    <li><Link to="/recommendation" onClick={() => setMenuOpen(false)}>Recommendations</Link></li>
    <li><Link to="/pest-detection" onClick={() => setMenuOpen(false)}>Disease Detection</Link></li>
    <li><Link to="/weather" onClick={() => setMenuOpen(false)}>Weather</Link></li>
    <li><Link to="/market" onClick={() => setMenuOpen(false)}>Market Prices</Link></li>
    <li><Link to="/farmer-guide" onClick={() => setMenuOpen(false)}>Farmer Guide</Link></li>
    <li><Link to="/feedback" onClick={() => setMenuOpen(false)}>Feedback</Link></li>
  </ul>

  {/* User/Login */}
  <div className={`nav-right ${menuOpen ? "active" : ""}`}>
    {user ? (
      <>
        <span className="username">{user.username || user.name}</span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login"><button className="login-btn">Login</button></Link>
        <Link to="/register"><button className="register-btn">Register</button></Link>
      </>
    )}
  </div>
</nav>

    </header>
  );
}
