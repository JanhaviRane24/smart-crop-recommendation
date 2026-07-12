from rest_framework import serializers
from .models import SoilData

class SoilDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilData
        fields = [
            'nitrogen',
            'phosphorus',
            'potassium',
            'temperature',
            'humidity',
            'ph',
            'rainfall'
        ]
