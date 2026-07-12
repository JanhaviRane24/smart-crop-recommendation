import axios from "axios";

// Make sure this URL matches your Django backend route
const BASE_URL = "http://localhost:8000/api/market";

export const fetchMarketPrice = async (state, district, market, commodity) => {
  try {
    // Build query params
    const params = {};
    if (state) params["state"] = state;
    if (district) params["district"] = district;
    if (market) params["market"] = market;
    if (commodity) params["commodity"] = commodity;

    const response = await axios.get(`${BASE_URL}/market-price/`, { params });

    return response.data;
  } catch (err) {
    console.error("Error fetching market data:", err);
    throw err; // Let the component handle the error
  }
};
