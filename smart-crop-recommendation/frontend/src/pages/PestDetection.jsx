import { useState } from "react";
import { detectPest } from "../api/detection.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/PestDetection.css";

export default function PestDetection() {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));  // Preview the selected image
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select an image");
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const data = await detectPest(file, token);  // Get the result from backend
      setResult(data);  // Set the result for rendering
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to detect pest");
    } finally {
      setLoading(false);
    }
  };

  const disease = result?.result?.disease?.suggestions?.[0];  // Extract disease details
  const solution = disease?.solution;  // Assuming solution is included in the API response

  return (
    <main className="pest-wrapper" aria-labelledby="pest-title">
      <div className="card pest-card">
        <h2 id="pest-title" className="title">🪲 Pest & Disease Detection</h2>

        <label htmlFor="file-upload" className="file-label">
          Upload Image *
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          aria-required="true"
        />

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Selected crop preview" className="preview-img" />
          </div>
        )}

        <button
          className="analyze-btn"
          onClick={handleUpload}
          aria-label="Analyze uploaded image for pest and disease"
        >
          Analyze Image
        </button>

        {loading && (
          <p className="loading" role="status" aria-live="polite">
            Analyzing image...
          </p>
        )}
        {error && (
          <p className="error" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
      </div>

      {disease && (
        <div className="result-card" role="region" aria-labelledby="result-title">
          <h3 id="result-title">🧪 Detection Result</h3>
          <p>
            <strong>Disease:</strong> {disease.name}
          </p>
          <p>
            <strong>Confidence:</strong> {(disease.probability * 100).toFixed(2)}%
          </p>

          {/* Display Solution if available */}
          {solution && (
            <div>
              <strong>Solution:</strong> {solution}
            </div>
          )}

          {/* If no solution is available */}
          {!solution && <p>No solution available for this disease.</p>}
        </div>
      )}
    </main>
  );
}
