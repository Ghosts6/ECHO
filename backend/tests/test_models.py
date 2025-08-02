
import pytest
from django.contrib.auth import get_user_model
from core.models import Patient, HealthReport, MedicalRecord, Appointment, SymptomLog, Notification
from django.utils import timezone
from datetime import date
from django.core.files.uploadedfile import SimpleUploadedFile

User = get_user_model()

@pytest.mark.django_db
def test_create_user():
    user = User.objects.create_user(email='test@example.com', username='testuser', password='testpass123')
    assert user.email == 'test@example.com'
    assert user.username == 'testuser'
    assert user.check_password('testpass123')

@pytest.mark.django_db
def test_create_patient():
    user = User.objects.create_user(email='p1@example.com', username='p1', password='pass')
    patient = Patient.objects.create(user=user, blood_type='A+', height=180, weight=75)
    assert patient.user.email == 'p1@example.com'
    assert patient.blood_type == 'A+'

@pytest.mark.django_db
def test_create_health_report():
    user = User.objects.create_user(email='p2@example.com', username='p2', password='pass')
    patient = Patient.objects.create(user=user)
    report = HealthReport.objects.create(
        patient=patient,
        title='Test Report',
        symptoms_description='Cough and fever',
        probable_conditions=[{"condition": "Flu", "probability": 0.8}],
        severity_level='MEDIUM',
        recommendations=["Rest", "Hydrate"]
    )
    assert report.title == 'Test Report'
    assert report.patient == patient
    assert report.severity_level == 'MEDIUM'

@pytest.mark.django_db
def test_create_medical_record(tmp_path):
    user = User.objects.create_user(email='p3@example.com', username='p3', password='pass')
    patient = Patient.objects.create(user=user)
    file_content = b"test content"
    uploaded = SimpleUploadedFile("testfile.txt", file_content, content_type="text/plain")
    record = MedicalRecord.objects.create(
        patient=patient,
        title='Lab Result',
        record_type='LAB_RESULT',
        file=uploaded,
        file_name='testfile.txt',
        file_size=len(file_content),
        file_type='text/plain',
        date_of_record=date.today()
    )
    assert record.title == 'Lab Result'
    assert record.patient == patient

@pytest.mark.django_db
def test_create_appointment():
    user = User.objects.create_user(email='p4@example.com', username='p4', password='pass')
    patient = Patient.objects.create(user=user)
    appt = Appointment.objects.create(
        patient=patient,
        title='Doctor Visit',
        appointment_type='CONSULTATION',
        scheduled_date=timezone.now(),
        healthcare_provider='Clinic A'
    )
    assert appt.title == 'Doctor Visit'
    assert appt.patient == patient

@pytest.mark.django_db
def test_create_symptom_log():
    user = User.objects.create_user(email='p5@example.com', username='p5', password='pass')
    patient = Patient.objects.create(user=user)
    log = SymptomLog.objects.create(
        patient=patient,
        date=date.today(),
        symptoms=[{"name": "headache", "severity": "MILD"}],
        severity_level='MILD'
    )
    assert log.patient == patient
    assert log.severity_level == 'MILD'

@pytest.mark.django_db
def test_create_notification():
    user = User.objects.create_user(email='p6@example.com', username='p6', password='pass')
    notif = Notification.objects.create(
        user=user,
        title='Test Notification',
        message='This is a test',
        notification_type='SYSTEM'
    )
    assert notif.user == user
    assert notif.title == 'Test Notification'
