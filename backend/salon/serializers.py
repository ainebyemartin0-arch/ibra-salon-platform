from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from datetime import timedelta
from .models import Service, Staff, Customer, Appointment, ContactMessage, Notification, Style

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class AppointmentCreateSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(write_only=True)
    customer_phone = serializers.CharField(write_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'service', 'staff', 'start_time', 'customer_name', 'customer_phone']

    def validate(self, attrs):
        staff = attrs.get('staff')
        start_time = attrs.get('start_time')
        service = attrs.get('service')
        if staff and start_time and service:
            end_time = start_time + timedelta(minutes=service.duration_mins)
            overlapping = Appointment.objects.filter(staff=staff, status__in=['PENDING', 'CONFIRMED'], start_time__gte=start_time, start_time__lt=end_time)
            if overlapping.exists():
                raise ValidationError({"detail": f"{staff.name} is already booked at this time."})
            existing_appts = Appointment.objects.filter(staff=staff, status__in=['PENDING', 'CONFIRMED'])
            for appt in existing_appts:
                appt_end = appt.start_time + timedelta(minutes=appt.service.duration_mins)
                if appt.start_time <= start_time < appt_end:
                    raise ValidationError({"detail": f"{staff.name} is already booked at this time."})
        return attrs

    def create(self, validated_data):
        customer_name = validated_data.pop('customer_name')
        customer_phone = validated_data.pop('customer_phone')
        customer, created = Customer.objects.get_or_create(phone_number=customer_phone, defaults={'name': customer_name})
        appointment = Appointment.objects.create(customer=customer, service=validated_data['service'], staff=validated_data.get('staff'), start_time=validated_data['start_time'], status='PENDING')
        Notification.objects.create(message=f"New booking request from {customer_name}", link="/admin")
        return appointment

class AppointmentListSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    customer_phone = serializers.CharField(source='customer.phone_number', read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)
    service_price = serializers.CharField(source='service.price', read_only=True)
    staff_name = serializers.CharField(source='staff.name', read_only=True, default='Unassigned')

    class Meta:
        model = Appointment
        fields = ['id', 'customer_name', 'customer_phone', 'service_name', 'service_price', 'staff_name', 'start_time', 'status']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = '__all__'
