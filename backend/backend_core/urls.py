from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.views.static import serve as static_serve
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]

# Serve React index.html for all non-API, non-admin routes
frontend_index = os.path.join(settings.FRONTEND_DIST, 'index.html')
if os.path.exists(frontend_index):
    urlpatterns += [
        re_path(r'^(?!api/|admin/|static/).*$', TemplateView.as_view(template_name='index.html'), name='react-app'),
    ]
