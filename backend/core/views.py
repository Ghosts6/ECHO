import os
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views import View
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import TeamMemberSerializer, UserSerializer, UserLoginSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer, PatientSerializer
from .models import TeamMember, User
from django.utils import timezone
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.generics import RetrieveUpdateAPIView
import uuid
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

# --- AUTH API VIEWS ---
@method_decorator(ensure_csrf_cookie, name='dispatch')
class SignupAPI(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        if request.data.get('website'):
            return Response({'detail': 'Bot detected.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'detail': 'Account created. Please verify your email.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class LoginAPI(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        if request.data.get('website'):
            return Response({'detail': 'Bot detected.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            # You can use JWT or session auth here. For now, just return user info.
            return Response({'detail': 'Login successful', 'user': UserSerializer(user).data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class ForgotPasswordAPI(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        if request.data.get('website'):
            return Response({'detail': 'Bot detected.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                token = str(uuid.uuid4())
                user.password_reset_token = token
                user.password_reset_expires = timezone.now() + timezone.timedelta(hours=1)
                user.save()
                # Send email (replace with your email backend)
                send_mail(
                    'Password Reset',
                    f'Your password reset token: {token}',
                    'noreply@echo.com',
                    [email],
                    fail_silently=True,
                )
            except User.DoesNotExist:
                pass  # Don't reveal if email exists
            return Response({'detail': 'If your email exists, a reset link has been sent.'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class ResetPasswordAPI(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        if request.data.get('website'):
            return Response({'detail': 'Bot detected.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            try:
                user = User.objects.get(password_reset_token=token, password_reset_expires__gte=timezone.now())
            except User.DoesNotExist:
                return Response({'detail': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.validated_data['password'])
            user.password_reset_token = None
            user.password_reset_expires = None
            user.save()
            return Response({'detail': 'Password has been reset.'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

@method_decorator(ensure_csrf_cookie, name='dispatch')
class AccountAPI(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


@method_decorator(ensure_csrf_cookie, name='dispatch')
class PatientAPI(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PatientSerializer

    def get_object(self):
        return self.request.user.patient_profile
