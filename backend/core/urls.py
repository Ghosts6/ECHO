from django.urls import path, re_path
from .views import ReactAppView, AuthStatusView, TeamListAPI, SignupAPI, LoginAPI, ForgotPasswordAPI, ResetPasswordAPI

urlpatterns = [
    path('team/', TeamListAPI.as_view(), name='team-list'),
    path('auth/status/', AuthStatusView.as_view(), name='auth-status'),
    path('auth/signup/', SignupAPI.as_view(), name='auth-signup'),
    path('auth/login/', LoginAPI.as_view(), name='auth-login'),
    path('auth/forgot/', ForgotPasswordAPI.as_view(), name='auth-forgot'),
    path('auth/reset/', ResetPasswordAPI.as_view(), name='auth-reset'),
    re_path(r'^.*$', ReactAppView.as_view(), name='react-app-fallback'),
]