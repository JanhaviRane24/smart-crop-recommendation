from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests

# External Disease Detection API URL
EXT_DETECTION_URL = "https://crop.kindwise.com/api/predict"  # Update if needed

class PestDetectionView(APIView):
    def post(self, request):
        # Receive the image from the request
        image = request.FILES.get('image')

        if not image:
            return Response({"error": "Image is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Prepare the image for sending to the external API
        files = {'images': (image.name, image.read(), image.content_type)}

        # Optional: get the detail and language parameters if provided by the frontend
        detail = request.query_params.get('detail', None)  # Get additional details if specified
        language = request.query_params.get('language', 'en')  # Default to English

        try:
            # Send the image to the external disease detection API
            response = requests.post(EXT_DETECTION_URL, files=files, headers={"Api-Key": "your-api-key"})

            if response.status_code == 200:
                result_data = response.json()

                # Extract disease info from the API response
                disease_name = result_data.get('result', {}).get('disease', {}).get('name', 'Unknown')
                confidence = result_data.get('result', {}).get('disease', {}).get('confidence', 0.0)
                solution = result_data.get('result', {}).get('disease', {}).get('solution', 'No solution available.')

                # Get additional details if requested (e.g., symptoms, treatment, etc.)
                disease_details = {}
                if detail:
                    # Example: If a specific detail like "treatment" is requested
                    disease_details = result_data.get('result', {}).get('disease', {}).get(detail, 'No detail available.')

                # Prepare the response data
                data = {
                    "disease": {
                        "name": disease_name,
                        "confidence": confidence,
                        "solution": solution,
                        "details": disease_details,
                    }
                }

                return Response(data, status=status.HTTP_200_OK)

            else:
                return Response({"error": "Failed to detect pest. Please try again."}, status=status.HTTP_400_BAD_REQUEST)

        except requests.RequestException as e:
            return Response({"error": f"Error with external API: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
