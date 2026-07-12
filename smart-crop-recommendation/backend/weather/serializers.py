from rest_framework import serializers
from .models import UserWeather

class UserWeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWeather
        fields = '__all__'
