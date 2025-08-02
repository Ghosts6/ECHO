from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from .views import maintenance_mode
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('maintenance/', maintenance_mode, name='maintenance_mode'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^(?!api/|admin/|static/).*$', TemplateView.as_view(template_name='index.html'))]