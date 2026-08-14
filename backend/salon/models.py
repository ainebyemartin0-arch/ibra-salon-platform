from django.db import models

class Staff(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default='Barber')
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='barbers/', blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.role})"

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    duration_mins = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='services/', blank=True, null=True, help_text="Optional service image")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.price} UGX"

class Customer(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(blank=True)
    loyalty_points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.phone_number})"

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True)
    start_time = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    deposit_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.service.name} for {self.customer.name} at {self.start_time}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

class Notification(models.Model):
    message = models.CharField(max_length=255)
    link = models.CharField(max_length=255, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Style(models.Model):
    CATEGORY_CHOICES = [
        ('FADES', 'Fades'),
        ('TAPERS', 'Tapers'),
        ('BEARDS', 'Beards'),
        ('DREADS', 'Dreads'),
        ('AFROS', 'Afros'),
        ('CAESAR', 'Caesar'),
        ('BOX_FADE', 'Box Fade'),
        ('NTEGE', 'Ntege (Push Back)'),
        ('LINE_UP', 'Line Up / Shape Up'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='styles/', help_text="Upload hairstyle image")
    is_featured = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.category})"
