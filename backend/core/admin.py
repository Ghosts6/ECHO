from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from .models import (
    User, Patient, HealthReport, MedicalRecord, 
    Appointment, SymptomLog, Notification
)


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_verified', 'is_active', 'date_joined')
    list_filter = ('is_verified', 'is_active', 'is_staff', 'is_superuser', 'gender', 'date_joined')
    search_fields = ('email', 'username', 'first_name', 'last_name', 'phone_number')
    ordering = ('-date_joined',)
    
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'phone_number', 'date_of_birth', 'gender', 'address')
        }),
        ('Emergency Contact', {
            'fields': ('emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relationship'),
            'classes': ('collapse',)
        }),
        ('Security', {
            'fields': ('is_verified', 'verification_token', 'password_reset_token', 'password_reset_expires'),
            'classes': ('collapse',)
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('user', 'blood_type', 'height', 'weight', 'insurance_provider', 'created_at')
    list_filter = ('blood_type', 'insurance_provider', 'created_at')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'insurance_provider')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Physical Information', {
            'fields': ('blood_type', 'height', 'weight')
        }),
        ('Medical Information', {
            'fields': ('allergies', 'chronic_conditions', 'current_medications', 'family_medical_history'),
            'classes': ('collapse',)
        }),
        ('Lifestyle Factors', {
            'fields': ('lifestyle_factors',),
            'classes': ('collapse',)
        }),
        ('Insurance', {
            'fields': ('insurance_provider', 'insurance_policy_number', 'insurance_group_number'),
            'classes': ('collapse',)
        }),
    )


@admin.register(HealthReport)
class HealthReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'patient', 'severity_level', 'status', 'analysis_date', 'risk_score')
    list_filter = ('severity_level', 'status', 'follow_up_required', 'analysis_date')
    search_fields = ('title', 'patient__user__email', 'patient__user__first_name', 'patient__user__last_name')
    ordering = ('-analysis_date',)
    readonly_fields = ('id', 'analysis_date', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'patient', 'title', 'symptoms_description')
        }),
        ('Analysis Results', {
            'fields': ('probable_conditions', 'severity_level', 'risk_factors', 'risk_score')
        }),
        ('Recommendations', {
            'fields': ('recommendations', 'suggested_treatments', 'suggested_medications', 'lifestyle_recommendations'),
            'classes': ('collapse',)
        }),
        ('Follow-up', {
            'fields': ('follow_up_required', 'follow_up_date', 'follow_up_notes'),
            'classes': ('collapse',)
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('analysis_date', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ('title', 'patient', 'record_type', 'date_of_record', 'healthcare_provider', 'file_size_display', 'is_private')
    list_filter = ('record_type', 'is_private', 'is_analyzed', 'date_of_record', 'created_at')
    search_fields = ('title', 'patient__user__email', 'healthcare_provider', 'doctor_name')
    ordering = ('-date_of_record',)
    readonly_fields = ('id', 'file_size', 'created_at', 'updated_at')
    
    def file_size_display(self, obj):
        if obj.file_size:
            size_kb = obj.file_size / 1024
            if size_kb > 1024:
                return f"{size_kb/1024:.1f} MB"
            return f"{size_kb:.1f} KB"
        return "N/A"
    file_size_display.short_description = 'File Size'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'patient', 'title', 'record_type')
        }),
        ('File Information', {
            'fields': ('file', 'file_name', 'file_size', 'file_type')
        }),
        ('Record Details', {
            'fields': ('date_of_record', 'healthcare_provider', 'doctor_name', 'diagnosis', 'treatment', 'medications', 'notes')
        }),
        ('AI Analysis', {
            'fields': ('ai_analysis', 'is_analyzed'),
            'classes': ('collapse',)
        }),
        ('Privacy', {
            'fields': ('is_private', 'shared_with'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'patient', 'appointment_type', 'scheduled_date', 'healthcare_provider', 'status')
    list_filter = ('appointment_type', 'status', 'scheduled_date', 'created_at')
    search_fields = ('title', 'patient__user__email', 'healthcare_provider', 'doctor_name')
    ordering = ('-scheduled_date',)
    readonly_fields = ('id', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'patient', 'title', 'description', 'appointment_type')
        }),
        ('Scheduling', {
            'fields': ('scheduled_date', 'duration', 'timezone')
        }),
        ('Healthcare Provider', {
            'fields': ('healthcare_provider', 'doctor_name', 'location', 'address', 'phone')
        }),
        ('Status & Reminders', {
            'fields': ('status', 'reminder_sent', 'reminder_date'),
            'classes': ('collapse',)
        }),
        ('Notes', {
            'fields': ('patient_notes', 'doctor_notes'),
            'classes': ('collapse',)
        }),
        ('Related Records', {
            'fields': ('related_health_report',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(SymptomLog)
class SymptomLogAdmin(admin.ModelAdmin):
    list_display = ('patient', 'date', 'severity_level', 'symptoms_count', 'created_at')
    list_filter = ('severity_level', 'date', 'created_at')
    search_fields = ('patient__user__email', 'patient__user__first_name', 'patient__user__last_name')
    ordering = ('-date',)
    readonly_fields = ('id', 'created_at', 'updated_at')
    
    def symptoms_count(self, obj):
        return len(obj.symptoms) if obj.symptoms else 0
    symptoms_count.short_description = 'Symptoms Count'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'patient', 'date', 'severity_level')
        }),
        ('Symptoms & Activities', {
            'fields': ('symptoms', 'medications_taken', 'activities')
        }),
        ('Notes', {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'notification_type', 'is_read', 'is_important', 'created_at')
    list_filter = ('notification_type', 'is_read', 'is_important', 'created_at')
    search_fields = ('title', 'message', 'user__email')
    ordering = ('-created_at',)
    readonly_fields = ('id', 'created_at', 'read_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'user', 'title', 'message', 'notification_type')
        }),
        ('Status', {
            'fields': ('is_read', 'is_important', 'read_at')
        }),
        ('Related Objects', {
            'fields': ('related_appointment', 'related_health_report'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_as_read', 'mark_as_unread']
    
    def mark_as_read(self, request, queryset):
        updated = queryset.update(is_read=True)
        self.message_user(request, f'{updated} notifications marked as read.')
    mark_as_read.short_description = "Mark selected notifications as read"
    
    def mark_as_unread(self, request, queryset):
        updated = queryset.update(is_read=False)
        self.message_user(request, f'{updated} notifications marked as unread.')
    mark_as_unread.short_description = "Mark selected notifications as unread"
