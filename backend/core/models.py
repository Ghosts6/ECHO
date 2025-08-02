from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
import uuid


class User(AbstractUser):
    """
    Extended User model with additional healthcare-specific fields
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=[
            ('M', 'Male'),
            ('F', 'Female'),
            ('O', 'Other'),
            ('P', 'Prefer not to say')
        ],
        blank=True
    )
    address = models.TextField(blank=True)
    emergency_contact_name = models.CharField(max_length=100, blank=True)
    emergency_contact_phone = models.CharField(max_length=15, blank=True)
    emergency_contact_relationship = models.CharField(max_length=50, blank=True)
    
    # Security fields
    is_verified = models.BooleanField(default=False)
    verification_token = models.UUIDField(default=uuid.uuid4, editable=False)
    password_reset_token = models.UUIDField(null=True, blank=True, editable=False)
    password_reset_expires = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(null=True, blank=True)
    
    # Use email as username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.email} ({self.get_full_name()})"


class Patient(models.Model):
    """
    Patient-specific information extending User model
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    blood_type = models.CharField(
        max_length=5,
        choices=[
            ('A+', 'A+'), ('A-', 'A-'),
            ('B+', 'B+'), ('B-', 'B-'),
            ('AB+', 'AB+'), ('AB-', 'AB-'),
            ('O+', 'O+'), ('O-', 'O-')
        ],
        blank=True
    )
    height = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # in cm
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # in kg
    allergies = models.JSONField(default=list, blank=True)
    chronic_conditions = models.JSONField(default=list, blank=True)
    current_medications = models.JSONField(default=list, blank=True)
    family_medical_history = models.JSONField(default=list, blank=True)
    lifestyle_factors = models.JSONField(default=dict, blank=True)  # smoking, exercise, etc.
    
    # Insurance information
    insurance_provider = models.CharField(max_length=100, blank=True)
    insurance_policy_number = models.CharField(max_length=50, blank=True)
    insurance_group_number = models.CharField(max_length=50, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'patients'
        verbose_name = 'Patient'
        verbose_name_plural = 'Patients'
    
    def __str__(self):
        return f"Patient: {self.user.get_full_name()}"


class HealthReport(models.Model):
    """
    AI-generated health reports from Aegis analysis
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='health_reports')
    
    # Report metadata
    title = models.CharField(max_length=200)
    symptoms_description = models.TextField()
    analysis_date = models.DateTimeField(auto_now_add=True)
    
    # AI Analysis Results
    probable_conditions = models.JSONField(default=list)  # List of conditions with probabilities
    severity_level = models.CharField(
        max_length=20,
        choices=[
            ('LOW', 'Low'),
            ('MEDIUM', 'Medium'),
            ('HIGH', 'High'),
            ('CRITICAL', 'Critical')
        ],
        default='LOW'
    )
    
    # Recommendations
    recommendations = models.JSONField(default=list)  # List of recommendations
    suggested_treatments = models.JSONField(default=list)
    suggested_medications = models.JSONField(default=list)
    lifestyle_recommendations = models.JSONField(default=list)
    
    # Risk Assessment
    risk_factors = models.JSONField(default=list)
    risk_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True,
        blank=True
    )
    
    # Follow-up
    follow_up_required = models.BooleanField(default=False)
    follow_up_date = models.DateField(null=True, blank=True)
    follow_up_notes = models.TextField(blank=True)
    
    # Status
    status = models.CharField(
        max_length=20,
        choices=[
            ('DRAFT', 'Draft'),
            ('COMPLETED', 'Completed'),
            ('REVIEWED', 'Reviewed by Doctor'),
            ('ARCHIVED', 'Archived')
        ],
        default='DRAFT'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'health_reports'
        verbose_name = 'Health Report'
        verbose_name_plural = 'Health Reports'
        ordering = ['-analysis_date']
    
    def __str__(self):
        return f"Health Report: {self.title} - {self.patient.user.get_full_name()}"


class MedicalRecord(models.Model):
    """
    Medical records and documents uploaded by patients
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_records')
    
    # Record metadata
    title = models.CharField(max_length=200)
    record_type = models.CharField(
        max_length=50,
        choices=[
            ('LAB_RESULT', 'Lab Result'),
            ('PRESCRIPTION', 'Prescription'),
            ('IMAGING', 'Imaging Report'),
            ('VACCINATION', 'Vaccination Record'),
            ('SURGERY', 'Surgery Report'),
            ('CONSULTATION', 'Consultation Note'),
            ('EMERGENCY', 'Emergency Report'),
            ('OTHER', 'Other')
        ]
    )
    
    # File information
    file = models.FileField(upload_to='medical_records/%Y/%m/%d/')
    file_name = models.CharField(max_length=255)
    file_size = models.BigIntegerField()  # in bytes
    file_type = models.CharField(max_length=50)
    
    # Record details
    date_of_record = models.DateField()
    healthcare_provider = models.CharField(max_length=200, blank=True)
    doctor_name = models.CharField(max_length=200, blank=True)
    diagnosis = models.TextField(blank=True)
    treatment = models.TextField(blank=True)
    medications = models.JSONField(default=list, blank=True)
    notes = models.TextField(blank=True)
    
    # AI Analysis (if applicable)
    ai_analysis = models.JSONField(default=dict, blank=True)
    is_analyzed = models.BooleanField(default=False)
    
    # Privacy and access
    is_private = models.BooleanField(default=True)
    shared_with = models.ManyToManyField(User, blank=True, related_name='shared_records')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'medical_records'
        verbose_name = 'Medical Record'
        verbose_name_plural = 'Medical Records'
        ordering = ['-date_of_record']
    
    def __str__(self):
        return f"Medical Record: {self.title} - {self.patient.user.get_full_name()}"


class Appointment(models.Model):
    """
    Doctor appointments and scheduling
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    
    # Appointment details
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    appointment_type = models.CharField(
        max_length=50,
        choices=[
            ('CONSULTATION', 'Consultation'),
            ('FOLLOW_UP', 'Follow-up'),
            ('EMERGENCY', 'Emergency'),
            ('ROUTINE', 'Routine Check-up'),
            ('SPECIALIST', 'Specialist Visit'),
            ('LAB_TEST', 'Lab Test'),
            ('IMAGING', 'Imaging'),
            ('OTHER', 'Other')
        ]
    )
    
    # Scheduling
    scheduled_date = models.DateTimeField()
    duration = models.IntegerField(default=30)  # in minutes
    timezone = models.CharField(max_length=50, default='UTC')
    
    # Healthcare provider
    healthcare_provider = models.CharField(max_length=200)
    doctor_name = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=500, blank=True)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    
    # Status
    status = models.CharField(
        max_length=20,
        choices=[
            ('SCHEDULED', 'Scheduled'),
            ('CONFIRMED', 'Confirmed'),
            ('CANCELLED', 'Cancelled'),
            ('COMPLETED', 'Completed'),
            ('NO_SHOW', 'No Show'),
            ('RESCHEDULED', 'Rescheduled')
        ],
        default='SCHEDULED'
    )
    
    # Reminders
    reminder_sent = models.BooleanField(default=False)
    reminder_date = models.DateTimeField(null=True, blank=True)
    
    # Notes
    patient_notes = models.TextField(blank=True)
    doctor_notes = models.TextField(blank=True)
    
    # Related records
    related_health_report = models.ForeignKey(
        HealthReport, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='appointments'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'appointments'
        verbose_name = 'Appointment'
        verbose_name_plural = 'Appointments'
        ordering = ['-scheduled_date']
    
    def __str__(self):
        return f"Appointment: {self.title} - {self.patient.user.get_full_name()}"


class SymptomLog(models.Model):
    """
    Daily symptom tracking for patients
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='symptom_logs')
    
    date = models.DateField()
    symptoms = models.JSONField(default=list)  # List of symptoms with severity
    severity_level = models.CharField(
        max_length=20,
        choices=[
            ('MILD', 'Mild'),
            ('MODERATE', 'Moderate'),
            ('SEVERE', 'Severe'),
            ('CRITICAL', 'Critical')
        ]
    )
    
    notes = models.TextField(blank=True)
    medications_taken = models.JSONField(default=list)
    activities = models.JSONField(default=list)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'symptom_logs'
        verbose_name = 'Symptom Log'
        verbose_name_plural = 'Symptom Logs'
        ordering = ['-date']
        unique_together = ['patient', 'date']
    
    def __str__(self):
        return f"Symptom Log: {self.patient.user.get_full_name()} - {self.date}"


class Notification(models.Model):
    """
    System notifications for users
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(
        max_length=50,
        choices=[
            ('APPOINTMENT', 'Appointment'),
            ('REPORT', 'Health Report'),
            ('MEDICATION', 'Medication Reminder'),
            ('SYSTEM', 'System'),
            ('SECURITY', 'Security'),
            ('OTHER', 'Other')
        ]
    )
    
    is_read = models.BooleanField(default=False)
    is_important = models.BooleanField(default=False)
    
    # Related objects
    related_appointment = models.ForeignKey(
        Appointment, 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True,
        related_name='notifications'
    )
    related_health_report = models.ForeignKey(
        HealthReport, 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True,
        related_name='notifications'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'notifications'
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Notification: {self.title} - {self.user.email}"
