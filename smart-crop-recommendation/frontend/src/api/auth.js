import axios from 'axios';

const API = import.meta.env.VITE_API_ACCOUNTS; // http://127.0.0.1:8000/accounts

// Login
export const loginUser = async ({ username, password }) => {
  const res = await axios.post(`${API}/login/`, { username, password });
  return res.data;
};

// Register
export const registerUser = async ({ username, password, email }) => {
  const res = await axios.post(`${API}/register/`, { username, password, email }, { withCredentials: true });
  return res.data;
};
