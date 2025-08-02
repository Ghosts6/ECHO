
import pytest
import uuid
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APIClient
from core.models import User


@pytest.mark.django_db
def test_signup_api():
    client = APIClient()
    data = {
        "email": "signup@example.com",
        "username": "signupuser",
        "password": "Testpass123!",
        "password_confirm": "Testpass123!"
    }
    response = client.post("/api/auth/signup/", data, format="json")
    assert response.status_code == 201
    assert User.objects.filter(email="signup@example.com").exists()


@pytest.mark.django_db
def test_login_api():
    client = APIClient()
    user = User.objects.create_user(email="login@example.com", username="loginuser", password="Testpass123!")
    data = {"email": "login@example.com", "password": "Testpass123!"}
    response = client.post("/api/auth/login/", data, format="json")
    assert response.status_code == 200
    assert response.data["detail"] == "Login successful"


@pytest.mark.django_db
def test_forgot_password_api():
    client = APIClient()
    user = User.objects.create_user(email="forgot@example.com", username="forgotuser", password="Testpass123!")
    data = {"email": "forgot@example.com"}
    response = client.post("/api/auth/forgot/", data, format="json")
    assert response.status_code == 200
    assert "reset link has been sent" in response.data["detail"].lower()


@pytest.mark.django_db
def test_reset_password_api():
    client = APIClient()
    user = User.objects.create_user(email="reset@example.com", username="resetuser", password="Oldpass123!")
    # Simulate forgot password to set token
    token = uuid.uuid4()
    user.password_reset_token = token
    user.password_reset_expires = timezone.now() + timezone.timedelta(hours=1)
    user.save()
    data = {
        "token": str(token),
        "password": "Newpass123!",
        "password_confirm": "Newpass123!"
    }
    response = client.post("/api/auth/reset/", data, format="json")
    assert response.status_code == 200
    user.refresh_from_db()
    assert user.check_password("Newpass123!")
