from django.urls import path
from .views import SaveCityView

urlpatterns = [
    # Make sure you have this line for your save-city endpoint
    path('save-city/', SaveCityView.as_view(), name='save_city'),
]
