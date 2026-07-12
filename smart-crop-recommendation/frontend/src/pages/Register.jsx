import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';
import '../styles/Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await registerUser(formData);
      setSuccess(res.message || "Registration successful");
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };
  // ... rest of the file (the return/JSX part) stays exactly the same

  return (
    <main className="register-container" aria-labelledby="register-title">
      <div className="register-card">

        {/* Tabs */}
        <nav className="register-tabs" aria-label="Authentication Options">
          <Link to="/login" className="tab-link">Login</Link>
          <button className="active" aria-current="page">Signup</button>
        </nav>

        <form onSubmit={handleSubmit} aria-label="Signup Form">
          <h2 id="register-title" className="register-title">Create Account</h2>

          {/* Alerts */}
          {error && (
            <div className="error" role="alert" aria-live="assertive">
              {error}
            </div>
          )}
          {success && (
            <div className="success" role="alert" aria-live="polite">
              {success}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Signup
          </button>

          <p className="login-text">
            Already a member? <Link to="/login">Login now</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
