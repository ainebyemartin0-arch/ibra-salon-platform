import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from salon.models import Style, Service, Staff

print("=========================================")
print(" Starting Local Database Seeding Process...")
print("=========================================\n")

# --- 1. SEED STYLES ---
print("[1/3] Seeding Styles...")
styles_to_add = [
    {'name': 'Classic Fade', 'category': 'FADES', 'image': 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop'},
    {'name': 'Beard Sculpt', 'category': 'BEARDS', 'image': 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop'},
    {'name': 'Ntege Push Back', 'category': 'NTEGE', 'image': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop'},
    {'name': 'Dreadlocks Style', 'category': 'DREADS', 'image': 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=800&auto=format&fit=crop'},
    {'name': 'Sharp Line Up', 'category': 'LINE_UP', 'image': 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800&auto=format&fit=crop'},
    {'name': 'Kids Style', 'category': 'FADES', 'image': 'https://images.unsplash.com/photo-1519415943484-9fa1873496c4?q=80&w=800&auto=format&fit=crop'},
]

for item in styles_to_add:
    Style.objects.filter(name=item['name']).delete()
    Style.objects.create(name=item['name'], category=item['category'], image=item['image'], is_featured=True)
    print(f"✅ Style Added: {item['name']}")

# --- 2. SEED SERVICES ---
print("\n[2/3] Seeding Services...")
services_to_add = [
    {'name': "Men's Fade", 'description': "Sharp, clean skin fade tailored to your preference.", 'duration_mins': 30, 'price': '15000.00', 'image': 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop'},
    {'name': "Beard Trim & Shape", 'description': "Precision beard grooming using scissors and straight razor.", 'duration_mins': 20, 'price': '10000.00', 'image': 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop'},
    {'name': "Kids Haircut", 'description': "Gentle and stylish haircuts for the young gentlemen.", 'duration_mins': 30, 'price': '12000.00', 'image': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop'},
    {'name': "Hair Wash & Style", 'description': "Relaxing wash, condition, and professional styling.", 'duration_mins': 45, 'price': '20000.00', 'image': 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800&auto=format&fit=crop'},
    {'name': "Razor Shave", 'description': "Classic hot towel and straight razor shave for a smooth finish.", 'duration_mins': 30, 'price': '18000.00', 'image': 'https://images.unsplash.com/photo-1599351431613-18ef1f6088a3?q=80&w=800&auto=format&fit=crop'},
]

for item in services_to_add:
    Service.objects.filter(name=item['name']).delete()
    Service.objects.create(name=item['name'], description=item['description'], duration_mins=item['duration_mins'], price=item['price'], image=item['image'], is_active=True)
    print(f"✅ Service Added: {item['name']}")

# --- 3. SEED BARBERS ---
print("\n[3/3] Seeding Barbers...")
barbers_to_add = [
    {'name': "James", 'role': "Master Barber", 'bio': "Expert in fades and classic cuts.", 'image': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop'},
    {'name': "David", 'role': "Barber", 'bio': "Specialist in beard sculpting and line ups.", 'image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'},
]

for item in barbers_to_add:
    Staff.objects.filter(name=item['name']).delete()
    Staff.objects.create(name=item['name'], role=item['role'], bio=item['bio'], image=item['image'], is_active=True)
    print(f"✅ Barber Added: {item['name']}")

print("\n=========================================")
print(" Local Seeding Complete!")
print("=========================================")
