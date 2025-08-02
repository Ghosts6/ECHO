from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse

def maintenance_mode(request):
    return render(request, "maintenance_mode.html")
