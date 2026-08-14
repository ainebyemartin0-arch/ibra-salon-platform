from django.contrib import admin
from .models import Service, Staff, Customer, Appointment, ContactMessage, Notification, Style

# Branding the Django Admin Header
admin.site.site_header = "Ibra Salon Administration"
admin.site.site_title = "Ibra Salon Admin Portal"
admin.site.index_title = "Developed by Ainebye Martin"

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'is_active')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration_mins', 'is_active')

@admin.register(Style)
class StyleAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'is_featured')

admin.site.register(Customer)
admin.site.register(Appointment)
admin.site.register(ContactMessage)
admin.site.register(Notification)
