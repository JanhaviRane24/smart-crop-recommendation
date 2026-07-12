import React from "react";
import "../styles/FarmerGuide.css";
import { FaTint, FaThermometerHalf, FaCloudRain, FaLeaf } from "react-icons/fa";

export default function FarmerGuide() {
  const kits = [
    {
      name: "Bionix Soil Doctor NPK Test Kit",
      price: "₹999",
      img: "https://m.media-amazon.com/images/I/61rZt3I4BsL._SX679_.jpg",
      link: "https://www.amazon.in/Bionix-Nitrogen-Potassium-Phosphorus-Testing/dp/B0FH3473XV"
    },
    {
      name: "Luster Leaf Rapitest Soil Kit (NPK + pH)",
      price: "₹2,307",
      img: "https://m.media-amazon.com/images/I/81odcLVnbsL._SX679_.jpg",
      link: "https://www.amazon.in/Luster-Leaf-1601-Rapitest-Soil/dp/B0000DI845"
    },
    {
      name: "Farmstool 4-in-1 Soil Tester",
      price: "₹736",
      img: "https://rukminim2.flixcart.com/image/832/832/kim1aq80-0/soil-test-kit/i/f/a/soil-test-kit-think-n-selecct-original-imafycfjajx74nvn.jpeg?q=70&crop=false",
      link: "https://www.flipkart.com/farmstool-4-in-1-soil-tester-test-kit/p/itm1a5f30aeb8cb4"
    },
    {
      name: "HealthyWiser 3-in-1 Soil Kit",
      price: "₹461",
      img: "https://m.media-amazon.com/images/I/71zwgW7OLlL._SX522_.jpg",
      link: "https://www.amazon.in/HealthyWiser-Moisture-Gardening-Outdoors-Battery/dp/B01J1HO6XY"
    },
    {
      name: "amiciSense 6-in-1 Advanced Soil Tester",
      price: "₹2,279",
      img: "https://m.media-amazon.com/images/I/71GdU6T1WrL._SX679_.jpg",
      link: "https://www.amazon.in/amiciSense-Soil-Tester-Fertility-Temperature/dp/B0DCNWCVX5"
    }
  ];

  const parameters = [
    {
      title: "Nitrogen (N)",
      icon: <FaLeaf />,
      tips: [
        "Dark green leaves → High Nitrogen (Usually -60 mg/kg)",
        "Yellow/Pale leaves → Low Nitrogen (Below 20–40 mg/kg)",
        "Healthy leaf growth → Medium Nitrogen (40–60 mg/kg)"
      ],
      formGuide: "Low = 20–40, Medium = 40–60, High = 60–120"
    },
    {
      title: "Phosphorus (P)",
      tips: [
        "Purple/red leaves → Low Phosphorus (Below 10 mg/kg)",
        "Slow root growth → P deficiency",
        "Normal growth → 10–25 mg/kg"
      ],
      formGuide: "Low = 5–15, Medium = 15–30, High = 30–50"
    },
    {
      title: "Potassium (K)",
      tips: [
        "Brown leaf edges → Low K (Below 100 mg/kg)",
        "Weak stems → Potassium deficiency",
        "Strong plant → 100–200 mg/kg"
      ],
      formGuide: "Low = 80–120, Medium = 120–200, High = 200–400"
    },
    {
      title: "pH Level",
      tips: [
        "Use pH strips (₹10) or digital meter",
        "Mix 1 cup soil + 1 cup water → dip strip → match colour",
        "Ideal pH: 6.0 – 7.5"
      ],
      formGuide: "Enter exact value (e.g., 6.8)"
    },
    {
      title: "Humidity",
      icon: <FaTint />,
      tips: [
        "Use a hygrometer (₹150–300)",
        "OR check local weather apps"
      ],
      formGuide: "Example → 60 (%)"
    },
    {
      title: "Temperature",
      icon: <FaThermometerHalf />,
      tips: ["Use digital thermometer or weather app"],
      formGuide: "Example → 28°C"
    },
    {
      title: "Rainfall",
      icon: <FaCloudRain />,
      tips: [
        "Use a simple bottle rain gauge (DIY)",
        "OR check IMD rainfall data"
      ],
      formGuide: "Example → 120 mm"
    }
  ];

  return (
    <main className="guide-container" role="main">
      <header>
        <h1 className="guide-title"><FaLeaf /> Farmer Soil & Weather Guide</h1>
        <p className="guide-subtitle">
          Easy methods to measure soil nutrients and weather — with real values you can enter into the form.
        </p>
      </header>

      {parameters.map((param, i) => (
        <section key={i} className="guide-card" aria-labelledby={`param-${i}`}>
          <h2 id={`param-${i}`}>{param.icon} {param.title}</h2>
          <ul>
            {param.tips.map((tip, j) => <li key={j}>{tip}</li>)}
          </ul>
          <p><strong>Enter in form:</strong> {param.formGuide}</p>
        </section>
      ))}

      <section aria-labelledby="kit-section">
        <h2 id="kit-section" className="recommend-header">🧪 Recommended Soil Testing Kits</h2>
        <p className="kit-note">Accurate kits for N, P, K, pH, moisture, temperature & more.</p>

        <div className="kits-container">
          {kits.map((k, i) => (
            <article className="kit-card" key={i}>
              <img src={k.img} alt={`Image of ${k.name}`} />
              <h3>{k.name}</h3>
              <p className="price">{k.price}</p>
              <a
                href={k.link}
                target="_blank"
                rel="noopener noreferrer"
                className="kit-btn"
                role="button"
                aria-label={`Buy ${k.name} online`}
              >
                Buy Now
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
