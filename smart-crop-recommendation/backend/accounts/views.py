# account/views.py

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.utils.decorators import method_decorator

from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# -----------------------
# Registration
# -----------------------
@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists"}, status=400)

            User.objects.create_user(username=username, email=email, password=password)

            return JsonResponse({"message": "Registration successful"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)


# -----------------------
# Login
# -----------------------
@api_view(['POST'])
def login_user(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    # Authenticate the user
    user = authenticate(username=username, password=password)
    if user:
        # Temporary token (replace later with JWT if needed)
        token = f"{user.username}-token"
        return JsonResponse({
            'user': {
                'username': user.username,
                'email': user.email
            },
            'token': token
        })

    return JsonResponse({'error': 'Invalid credentials'}, status=401)
