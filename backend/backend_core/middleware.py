from django.conf import settings
from django.shortcuts import redirect
from django.urls import reverse

class MaintenanceModeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if getattr(settings, 'MAINTENANCE_MODE', False):
            # Allow access to the maintenance page and admin
            if not request.path.startswith(reverse('maintenance_mode')) and not request.path.startswith('/admin/'):
                return redirect('maintenance_mode')
        return self.get_response(request)
