import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_ACCOUNTS; // https://smart-crop-backend-hq3t.onrender.com/api/accounts

// Login
export const loginUser = async ({ username, password }) => {
  const res = await axios.post(`${BASE_URL}/login/`, { username, password });
  return res.data;
};

// Register
export const registerUser = async ({ username, password, email }) => {
  const res = await axios.post(`${BASE_URL}/register/`, { username, password, email }, { withCredentials: true });
  return res.data;
};
