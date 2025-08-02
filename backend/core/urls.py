from django.urls import path, re_path
from .views import ReactAppView

urlpatterns = [
    # Add API endpoints here, e.g. path('example/', views.example_api),
    re_path(r'^.*$', ReactAppView.as_view(), name='react-app-fallback'),
]
