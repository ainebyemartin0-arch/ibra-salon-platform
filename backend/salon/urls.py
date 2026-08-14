from django.urls import path
from .views import (
    ServiceListView, ServiceDetailView,
    StaffListView, StaffDetailView,
    AppointmentCreateView, AppointmentListView, AppointmentUpdateView, AppointmentTrackView,
    simulate_payment, admin_stats, ContactMessageCreateView,
    NotificationListView, NotificationMarkReadView, StyleListView, CustomerListView
)

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('services/<int:pk>/', ServiceDetailView.as_view(), name='service-detail'),
    path('staff/', StaffListView.as_view(), name='staff-list'),
    path('staff/<int:pk>/', StaffDetailView.as_view(), name='staff-detail'),
    path('appointments/create/', AppointmentCreateView.as_view(), name='appointment-create'),
    path('appointments/', AppointmentListView.as_view(), name='appointment-list'),
    path('appointments/<int:pk>/update/', AppointmentUpdateView.as_view(), name='appointment-update'),
    path('appointments/<int:pk>/track/', AppointmentTrackView.as_view(), name='appointment-track'), # NEW
    path('appointments/<int:pk>/pay/', simulate_payment, name='simulate-payment'),
    path('admin/stats/', admin_stats, name='admin-stats'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact-create'),
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/read/', NotificationMarkReadView.as_view(), name='notification-read'),
    path('styles/', StyleListView.as_view(), name='style-list'),
    path('customers/', CustomerListView.as_view(), name='customer-list'),
]
