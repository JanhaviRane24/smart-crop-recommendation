import axios from "axios";

const API_URL = import.meta.env.VITE_DISEASE_API_URL;
const API_KEY = import.meta.env.VITE_DISEASE_API_KEY;

export const detectPest = async (file) => {
  const formData = new FormData();
  formData.append("images", file);  // Ensure the field name matches the API's requirement

  try {
    const res = await axios.post(API_URL, formData, {
      headers: {
        "Api-Key": API_KEY,
        "Content-Type": "multipart/form-data",  // Proper content type for file uploads
      },
    });

    return res.data;  // Return the result
  } catch (err) {
    // Handle errors properly
    console.error("Error in detecting pest:", err);
    throw new Error("Failed to detect pest. Please try again later.");
  }
};
