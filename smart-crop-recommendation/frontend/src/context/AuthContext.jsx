import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser} from '../api/auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const login = async ({ username, password }) => {
    try {
      const data = await loginUser({ username, password });
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message || 'Login failed');
    }
  };

  const register = async ({ username, password, email }) => {
    try {
      const data = await registerUser({ username, password, email });
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // -----------------------------
  // New functions: Forgot & Reset
  // -----------------------------
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register, 
        
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
