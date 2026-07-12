from django.urls import path
from .views import get_recommendation  # make sure the view exists

urlpatterns = [
    path('', get_recommendation, name='recommendation'),  # POST request here
]
