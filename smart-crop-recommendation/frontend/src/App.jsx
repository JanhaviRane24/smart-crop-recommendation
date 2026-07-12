import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Recommendation from './pages/Recommendation.jsx';
import PestDetection from './pages/PestDetection.jsx';
import Weather from './pages/Weather.jsx';
import HomePage from './pages/Homepage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Register from './pages/Register.jsx';
import Market from './pages/Market.jsx';
import Footer from "./components/Footer";
import FarmerGuide from "./pages/FarmerGuide";
import Feedback from "./pages/Feedback";



export default function App() {
  return (
    <div className="app-container">
      <Navbar />

      {/* Main content region for screen readers */}
      <main className="page-wrapper" id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/farmer-guide" element={<FarmerGuide />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/pest-detection" element={<PestDetection />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/market" element={<Market />} />
            <Route path="/feedback" element={<Feedback />} />


          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
