from django.db import models

class UserWeather(models.Model):
    city = models.CharField(max_length=100)  # City field
    temperature = models.FloatField(null=True, blank=True)  # Optional: temperature
    humidity = models.FloatField(null=True, blank=True)  # Optional: humidity
    wind_speed = models.FloatField(null=True, blank=True)  # Optional: wind speed
    condition = models.CharField(max_length=100, null=True, blank=True)  # Optional: weather condition
    submitted_at = models.DateTimeField(auto_now_add=True)  # Timestamp when saved

    def __str__(self):
        return f"{self.city} - {self.submitted_at}"
