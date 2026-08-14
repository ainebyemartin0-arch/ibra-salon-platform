from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum, Count
from django.utils import timezone
from .models import Service, Staff, Customer, Appointment, ContactMessage, Notification, Style
from .serializers import (
    ServiceSerializer, StaffSerializer, AppointmentCreateSerializer, 
    AppointmentListSerializer, ContactMessageSerializer, NotificationSerializer, StyleSerializer, CustomerSerializer
)

class ServiceListView(generics.ListCreateAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class StaffListView(generics.ListCreateAPIView):
    queryset = Staff.objects.filter(is_active=True)
    serializer_class = StaffSerializer
    permission_classes = [AllowAny]

class StaffDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class AppointmentCreateView(generics.CreateAPIView):
    serializer_class = AppointmentCreateSerializer

class AppointmentListView(generics.ListAPIView):
    queryset = Appointment.objects.all().order_by('-start_time')
    serializer_class = AppointmentListSerializer
    permission_classes = [permissions.IsAuthenticated]

class AppointmentUpdateView(generics.UpdateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentListSerializer
    http_method_names = ['patch']
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        old_status = serializer.instance.status
        new_status = serializer.validated_data.get('status', old_status)
        instance = serializer.save()
        if old_status != 'COMPLETED' and new_status == 'COMPLETED':
            customer = instance.customer
            price = float(instance.service.price)
            points_earned = int(price / 1000)
            customer.loyalty_points += points_earned
            customer.save()

# NEW: Public Tracking Endpoint
class AppointmentTrackView(generics.RetrieveAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentListSerializer
    permission_classes = [AllowAny] # Anyone with the ID can track it

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_stats(request):
    all_appointments = Appointment.objects.all()
    completed_appts = all_appointments.filter(status='COMPLETED')
    completed_count = completed_appts.count()
    pending_count = all_appointments.filter(status='PENDING').count()
    revenue_data = completed_appts.aggregate(total=Sum('service__price'))
    total_revenue = revenue_data['total'] if revenue_data['total'] is not None else 0
    avg_value = total_revenue / completed_count if completed_count > 0 else 0
    top_service_data = completed_appts.values('service__name').annotate(count=Count('id')).order_by('-count').first()
    top_service = top_service_data['service__name'] if top_service_data else "N/A"
    top_service_count = top_service_data['count'] if top_service_data else 0
    top_barber_data = completed_appts.exclude(staff=None).values('staff__name').annotate(revenue=Sum('service__price')).order_by('-revenue').first()
    top_barber = top_barber_data['staff__name'] if top_barber_data else "N/A"
    top_barber_revenue = top_barber_data['revenue'] if top_barber_data else 0
    return Response({
        "today_revenue": total_revenue, "completed_today": completed_count, "pending_today": pending_count,
        "total_appointments_today": all_appointments.count(), "avg_booking_value": avg_value,
        "top_service": top_service, "top_service_count": top_service_count,
        "top_barber": top_barber, "top_barber_revenue": top_barber_revenue
    })

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([]) 
def simulate_payment(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
        appointment.deposit_paid = True
        appointment.status = 'CONFIRMED'
        appointment.save()
        return Response({"status": "success", "message": "Payment received.", "new_status": appointment.status})
    except Appointment.DoesNotExist:
        return Response({"error": "Appointment not found"}, status=404)

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    def perform_create(self, serializer):
        instance = serializer.save()
        Notification.objects.create(message=f"New contact message from {instance.name}", link="/admin")

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Notification.objects.all().order_by('-created_at')[:10]

class NotificationMarkReadView(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['patch']
    def get_queryset(self):
        return Notification.objects.all()
    def perform_update(self, serializer):
        serializer.save(is_read=True)

class StyleListView(generics.ListCreateAPIView):
    queryset = Style.objects.filter(is_featured=True)
    serializer_class = StyleSerializer
    permission_classes = [AllowAny]

class CustomerListView(generics.ListAPIView):
    queryset = Customer.objects.all().order_by('-created_at')
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
