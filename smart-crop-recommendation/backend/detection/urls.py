from django.urls import path
from .views import PestDetectionView

urlpatterns = [
    path('scan/', PestDetectionView.as_view(), name='pest-detection'),
]
