import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ username, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container" aria-labelledby="login-title">
      <div className="login-card">

        {/* Tabs */}
        <nav className="login-tabs" aria-label="Authentication Tabs">
          <button className="active" aria-current="page">Login</button>
          <Link to="/register" className="tab-link">Signup</Link>
        </nav>

        <form onSubmit={handleSubmit} aria-label="Login Form">
          <h2 id="login-title" className="login-title">Welcome Back</h2>

          {error && (
            <div className="error" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

         

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="signup-text">
            Not a member? <Link to="/register">Signup now</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
