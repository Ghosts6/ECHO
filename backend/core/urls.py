from django.urls import path, re_path
from .views import ReactAppView

urlpatterns = [
    re_path(r'^.*$', ReactAppView.as_view(), name='react-app-fallback'),
]
