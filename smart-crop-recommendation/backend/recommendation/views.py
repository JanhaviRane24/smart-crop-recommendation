from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SoilRecommendation
import pandas as pd
import os
from django.conf import settings


FERTILIZER_GUIDE = {
    "rice": [
        "Apply Nitrogen 50, Phosphorus 40, and Potassium 30 at the time of transplanting.",
        "Split the nitrogen into 3 doses: at transplanting, tillering, and panicle initiation.",
        "Add Zinc Sulfate (20 kg per acre) once every season."
    ],

    "maize": [
        "Apply Nitrogen 120, Phosphorus 60, and Potassium 40 as a basal dose.",
        "Add extra Potassium during the knee-high growth stage.",
        "Use compost (1–2 tons) to improve soil quality."
    ],

    "chickpea": [
        "Apply Nitrogen 20 and Phosphorus 40 before sowing.",
        "Use Rhizobium seed treatment to help plants fix nitrogen naturally.",
        "Add 10 kg sulfur per acre for better pod development."
    ],

    "kidneybeans": [
        "Apply Nitrogen 25, Phosphorus 50, and Potassium 25 before sowing.",
        "Mix 2 tons of well-decomposed manure into the soil.",
        "Use molybdenum-treated seeds to improve nitrogen fixation."
    ],

    "pigeonpeas": [
        "Apply Nitrogen 20, Phosphorus 50, and Potassium 20 at the time of sowing.",
        "Add 2 tons of compost or cow dung for improved soil health.",
        "Treat seeds with Rhizobium and phosphate-solubilizing bacteria."
    ],

    "mothbeans": [
        "Apply Nitrogen 20 and Phosphorus 40 at sowing.",
        "Use Rhizobium culture for better nitrogen fixation.",
        "Apply gypsum to improve soil quality."
    ],

    "mungbean": [
        "Apply Nitrogen 20, Phosphorus 40, and Potassium 20 during sowing.",
        "Treat seeds with Rhizobium for better growth.",
        "Add 5 kg sulfur per acre for more pod formation."
    ],

    "blackgram": [
        "Apply Nitrogen 20, Phosphorus 40, and Potassium 20 before sowing.",
        "Use Rhizobium and PSB culture on seeds.",
        "Add 2 tons of compost before field preparation."
    ],

    "lentil": [
        "Apply Nitrogen 18 and Phosphorus 46 before sowing.",
        "Use Rhizobium culture for nitrogen fixation.",
        "Add 10 kg sulfur per acre through gypsum."
    ],

    "pomegranate": [
        "Apply yearly Nitrogen 600, Phosphorus 200, and Potassium 400 in 3 split doses.",
        "Add 20–25 kg organic manure around each plant.",
        "Spray micronutrients like Zinc, Iron, and Magnesium during fruit set."
    ],

    "banana": [
        "Apply yearly Nitrogen 200, Phosphorus 60, and Potassium 200 in monthly doses.",
        "Use 10–15 kg organic manure every month.",
        "Apply Magnesium sulfate and Boron to increase fruit size."
    ],

    "mango": [
        "Apply yearly Nitrogen 750, Phosphorus 250, and Potassium 750 depending on tree age.",
        "Add 25–30 kg of organic manure per tree.",
        "Spray micronutrients such as Zinc, Manganese, and Boron during flowering."
    ],

    "grapes": [
        "Apply Nitrogen 60, Phosphorus 40, and Potassium 60 at pruning time.",
        "Add 20–25 kg organic manure per vine each year.",
        "Spray Magnesium sulfate and Boron before flowering."
    ],

    "watermelon": [
        "Apply Nitrogen 40, Phosphorus 40, and Potassium 40 at the time of sowing.",
        "Divide nitrogen into 2–3 doses during growth.",
        "Spray Boron to increase sweetness and fruit quality."
    ],

    "muskmelon": [
        "Apply Nitrogen 40, Phosphorus 40, and Potassium 40 at sowing.",
        "Add 20 kg extra Potassium during flowering.",
        "Use organic manure for better fruit taste and yield."
    ],

    "apple": [
        "Apply Nitrogen 70, Phosphorus 35, and Potassium 70 during winter.",
        "Add 10–15 kg organic manure around each tree every year.",
        "Spray Boron and Calcium to prevent fruit cracking."
    ],

    "orange": [
        "Apply yearly Nitrogen 600, Phosphorus 200, and Potassium 500 in 3–4 split doses.",
        "Add 20–25 kg organic manure per plant.",
        "Spray Iron, Zinc, and Magnesium during fruiting stages."
    ],

    "papaya": [
        "Apply yearly Nitrogen 200, Phosphorus 200, and Potassium 200 in monthly splits.",
        "Add 10 kg organic manure every month.",
        "Use Boron and Magnesium sulfate to increase fruit size and sweetness."
    ],

    "coconut": [
        "Apply yearly Nitrogen 500, Phosphorus 320, and Potassium 1200 in two split doses.",
        "Add 20–25 kg compost or manure around the palm.",
        "Apply Boron and Magnesium sulfate for better nut development."
    ],

    "cotton": [
        "Apply Nitrogen 60, Phosphorus 30, and Potassium 30 during sowing.",
        "Add 25 kg Potassium per acre during flowering.",
        "Use Magnesium sulfate to prevent leaf reddening."
    ],

    "jute": [
        "Apply Nitrogen 40, Phosphorus 20, and Potassium 20 before sowing.",
        "Add 15–20 kg sulfur per acre.",
        "Use 2–3 tons of organic manure for better fiber quality."
    ],

    "coffee": [
        "Apply yearly Nitrogen 140, Phosphorus 90, and Potassium 140 in two splits.",
        "Add 10–20 kg compost around each plant.",
        "Use lime once every two years to maintain soil pH balance."
    ]
}
# Correct CSV path
CSV_PATH = os.path.join(settings.BASE_DIR, "recommendation", "data", "Crop_recommendation.csv")
df = pd.read_csv(CSV_PATH)

@api_view(['POST'])
def get_recommendation(request):
    data = request.data

    def safe_float(value):
        try:
            return float(value)
        except:
            return 0.0

    N = safe_float(data.get("nitrogen"))
    P = safe_float(data.get("phosphorus"))
    K = safe_float(data.get("potassium"))
    temperature = safe_float(data.get("temperature"))
    humidity = safe_float(data.get("humidity"))
    ph = safe_float(data.get("ph"))
    rainfall = safe_float(data.get("rainfall"))

    # Score calculation
    df['score'] = (
        abs(df['N'] - N) +
        abs(df['P'] - P) +
        abs(df['K'] - K) +
        abs(df['temperature'] - temperature) +
        abs(df['humidity'] - humidity) +
        abs(df['ph'] - ph) +
        abs(df['rainfall'] - rainfall)
    )

    recommended_crop = df.loc[df['score'].idxmin()]['label']
    fertilizer = FERTILIZER_GUIDE.get(recommended_crop.lower(), "No fertilizer data available.")

    # Save to database
    SoilRecommendation.objects.create(
        nitrogen=N,
        phosphorus=P,
        potassium=K,
        temperature=temperature,
        humidity=humidity,
        ph=ph,
        rainfall=rainfall,
        recommended_crop=recommended_crop
    )

    return Response({
        "crop": recommended_crop,
        "fertilizer": fertilizer
    })
