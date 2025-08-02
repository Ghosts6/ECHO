from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import (
    User, Patient, HealthReport, MedicalRecord, 
    Appointment, SymptomLog, Notification, TeamMember
)


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    password = serializers.CharField(write_only=True, required=False)
    password_confirm = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name', 'phone_number',
            'date_of_birth', 'gender', 'address', 'emergency_contact_name',
            'emergency_contact_phone', 'emergency_contact_relationship',
            'is_verified', 'password', 'password_confirm', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'is_verified', 'created_at', 'updated_at']
    
    def validate(self, attrs):
        if 'password' in attrs and 'password_confirm' in attrs:
            if attrs['password'] != attrs['password_confirm']:
                raise serializers.ValidationError("Passwords don't match")
            validate_password(attrs['password'])
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm', None)
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    """Serializer for user login"""
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include email and password')
        
        return attrs


class PatientSerializer(serializers.ModelSerializer):
    """Serializer for Patient model"""
    user = UserSerializer(read_only=True)
    user_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = Patient
        fields = [
            'id', 'user', 'user_id', 'blood_type', 'height', 'weight',
            'allergies', 'chronic_conditions', 'current_medications',
            'family_medical_history', 'lifestyle_factors',
            'insurance_provider', 'insurance_policy_number', 'insurance_group_number',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class HealthReportSerializer(serializers.ModelSerializer):
    """Serializer for HealthReport model"""
    patient = PatientSerializer(read_only=True)
    patient_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = HealthReport
        fields = [
            'id', 'patient', 'patient_id', 'title', 'symptoms_description',
            'analysis_date', 'probable_conditions', 'severity_level',
            'recommendations', 'suggested_treatments', 'suggested_medications',
            'lifestyle_recommendations', 'risk_factors', 'risk_score',
            'follow_up_required', 'follow_up_date', 'follow_up_notes',
            'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'analysis_date', 'created_at', 'updated_at']


class MedicalRecordSerializer(serializers.ModelSerializer):
    """Serializer for MedicalRecord model"""
    patient = PatientSerializer(read_only=True)
    patient_id = serializers.UUIDField(write_only=True)
    file_size_display = serializers.SerializerMethodField()
    
    class Meta:
        model = MedicalRecord
        fields = [
            'id', 'patient', 'patient_id', 'title', 'record_type',
            'file', 'file_name', 'file_size', 'file_size_display', 'file_type',
            'date_of_record', 'healthcare_provider', 'doctor_name',
            'diagnosis', 'treatment', 'medications', 'notes',
            'ai_analysis', 'is_analyzed', 'is_private', 'shared_with',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'file_size', 'created_at', 'updated_at']
    
    def get_file_size_display(self, obj):
        if obj.file_size:
            size_kb = obj.file_size / 1024
            if size_kb > 1024:
                return f"{size_kb/1024:.1f} MB"
            return f"{size_kb:.1f} KB"
        return "N/A"


class AppointmentSerializer(serializers.ModelSerializer):
    """Serializer for Appointment model"""
    patient = PatientSerializer(read_only=True)
    patient_id = serializers.UUIDField(write_only=True)
    related_health_report = HealthReportSerializer(read_only=True)
    related_health_report_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'patient_id', 'title', 'description', 'appointment_type',
            'scheduled_date', 'duration', 'timezone', 'healthcare_provider',
            'doctor_name', 'location', 'address', 'phone', 'status',
            'reminder_sent', 'reminder_date', 'patient_notes', 'doctor_notes',
            'related_health_report', 'related_health_report_id',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class SymptomLogSerializer(serializers.ModelSerializer):
    """Serializer for SymptomLog model"""
    patient = PatientSerializer(read_only=True)
    patient_id = serializers.UUIDField(write_only=True)
    symptoms_count = serializers.SerializerMethodField()
    
    class Meta:
        model = SymptomLog
        fields = [
            'id', 'patient', 'patient_id', 'date', 'symptoms', 'severity_level',
            'notes', 'medications_taken', 'activities', 'symptoms_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_symptoms_count(self, obj):
        return len(obj.symptoms) if obj.symptoms else 0


class NotificationSerializer(serializers.ModelSerializer):
    """Serializer for Notification model"""
    user = UserSerializer(read_only=True)
    user_id = serializers.UUIDField(write_only=True)
    related_appointment = AppointmentSerializer(read_only=True)
    related_health_report = HealthReportSerializer(read_only=True)
    
    class Meta:
        model = Notification
        fields = [
            'id', 'user', 'user_id', 'title', 'message', 'notification_type',
            'is_read', 'is_important', 'related_appointment', 'related_health_report',
            'created_at', 'read_at'
        ]
        read_only_fields = ['id', 'created_at', 'read_at']


class PasswordResetSerializer(serializers.Serializer):
    """Serializer for password reset request"""
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer for password reset confirmation"""
    token = serializers.CharField()
    password = serializers.CharField()
    password_confirm = serializers.CharField()
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        validate_password(attrs['password'])
        return attrs


class EmailVerificationSerializer(serializers.Serializer):
    """Serializer for email verification"""
    token = serializers.CharField()


class HealthReportCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating health reports with AI analysis"""
    patient_id = serializers.UUIDField(write_only=True)
    symptoms_description = serializers.CharField(required=True)
    
    class Meta:
        model = HealthReport
        fields = [
            'patient_id', 'title', 'symptoms_description'
        ]
    
    def create(self, validated_data):
        # This will be extended with AI analysis logic
        patient_id = validated_data.pop('patient_id')
        try:
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            raise serializers.ValidationError("Patient not found")
        
        # Create initial report (AI analysis will be added later)
        report = HealthReport.objects.create(
            patient=patient,
            title=validated_data.get('title', 'Health Analysis Report'),
            symptoms_description=validated_data['symptoms_description'],
            status='DRAFT'
        )
        return report


class MedicalRecordUploadSerializer(serializers.ModelSerializer):
    """Serializer for uploading medical records"""
    patient_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = MedicalRecord
        fields = [
            'patient_id', 'title', 'record_type', 'file', 'date_of_record',
            'healthcare_provider', 'doctor_name', 'diagnosis', 'treatment',
            'medications', 'notes', 'is_private'
        ]
    
    def validate_file(self, value):
        # Validate file size (max 10MB)
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError("File size must be less than 10MB")
        
        # Validate file type
        allowed_types = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx']
        file_extension = value.name.split('.')[-1].lower()
        if file_extension not in allowed_types:
            raise serializers.ValidationError(f"File type not allowed. Allowed types: {', '.join(allowed_types)}")
        
        return value
    
    def create(self, validated_data):
        patient_id = validated_data.pop('patient_id')
        try:
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            raise serializers.ValidationError("Patient not found")
        
        file_obj = validated_data['file']
        validated_data['file_name'] = file_obj.name
        validated_data['file_size'] = file_obj.size
        validated_data['file_type'] = file_obj.content_type
        
        record = MedicalRecord.objects.create(patient=patient, **validated_data)
        return record 
    
class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ["id", "name", "role", "avatar", "linkedin", "image", "order"]