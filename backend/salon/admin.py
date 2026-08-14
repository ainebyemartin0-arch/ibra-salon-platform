from django.contrib import admin
from .models import Service, Staff, Customer, Appointment, ContactMessage, Notification, Style

admin.site.register(Staff)
admin.site.register(Service)
admin.site.register(Customer)
admin.site.register(Appointment)
admin.site.register(ContactMessage)
admin.site.register(Notification)
admin.site.register(Style) # NEW
