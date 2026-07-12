from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserWeather

class SaveCityView(APIView):
    def post(self, request):
        city = request.data.get('city')
        if not city:
            return Response({"error": "City name is required"}, status=400)

        # Save the city to the database
        user_weather = UserWeather.objects.create(city=city)

        return Response({"message": "City saved successfully!", "city": user_weather.city})
