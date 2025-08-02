import os
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views import View
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import TeamMemberSerializer
from .models import TeamMember

class ReactAppView(View):
    def get(self, request):
        # Only use FRONTEND_DIST for serving React app, not for API endpoints
        index_path = os.path.join(getattr(settings, 'FRONTEND_DIST', ''), 'index.html')
        try:
            with open(index_path, 'r') as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            return HttpResponse(
                "This build of the React app is not found. Please run the React build process.",
                status=501,
            )

class AuthStatusView(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response({'isAuthenticated': True, 'username': request.user.username})
        return Response({'isAuthenticated': False})
    

class TeamListAPI(APIView):
    def get(self, request):
        queryset = TeamMember.objects.all().order_by('order', 'name')
        serializer = TeamMemberSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)

