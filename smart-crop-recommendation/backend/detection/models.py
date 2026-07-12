from django.db import models

class PestDetection(models.Model):
    image = models.ImageField(upload_to='disease_images/')  # Save image
    disease_name = models.CharField(max_length=255, blank=True, null=True)  # Disease name
    confidence = models.FloatField(blank=True, null=True)  # Confidence level
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp

    def __str__(self):
        return f"Disease: {self.disease_name}, Confidence: {self.confidence}%"
