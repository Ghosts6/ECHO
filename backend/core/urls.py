from django.urls import path, re_path
from .views import ReactAppView, AuthStatusView, TeamListAPI, SignupAPI, LoginAPI, ForgotPasswordAPI, ResetPasswordAPI, AccountAPI, PatientAPI

urlpatterns = [
    path('team/', TeamListAPI.as_view(), name='team-list'),
    path('auth/status/', AuthStatusView.as_view(), name='auth-status'),
    path('auth/signup/', SignupAPI.as_view(), name='auth-signup'),
    path('auth/login/', LoginAPI.as_view(), name='auth-login'),
    path('auth/forgot/', ForgotPasswordAPI.as_view(), name='auth-forgot'),
    path('auth/reset/', ResetPasswordAPI.as_view(), name='auth-reset'),
    path('account/', AccountAPI.as_view(), name='account-info'),
    path('patient/', PatientAPI.as_view(), name='patient-info'),
    re_path(r'^.*$', ReactAppView.as_view(), name='react-app-fallback'),
]