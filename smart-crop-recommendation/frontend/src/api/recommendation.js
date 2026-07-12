import axios from "axios";

const API = import.meta.env.VITE_API_RECOMMENDATION; // e.g., http://127.0.0.1:8000/api

export const getRecommendation = async (formData, token) => {
  const res = await axios.post(
    `${API}/`,  // POST to your Django endpoint
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`, // optional, if using auth
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
