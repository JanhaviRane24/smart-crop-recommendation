from rest_framework import serializers
from .models import PestDetection

class PestDetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PestDetection
        fields = ['image', 'disease_name', 'confidence', 'created_at']
