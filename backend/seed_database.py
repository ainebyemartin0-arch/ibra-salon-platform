import os
import django
from django.core.files import File

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from salon.models import Style, Service

SEED_DIR = 'seed'

print("=========================================")
print(" Starting Database Seeding Process...")
print("=========================================")

# --- 1. SEED STYLES ---
print("\n[1/2] Seeding Styles...")
styles_to_add = [
    {'name': 'Classic Fade', 'category': 'FADES', 'filename': 'fade.png'},
    {'name': 'Beard Sculpt', 'category': 'BEARDS', 'filename': 'beard.png'},
    {'name': 'Ntege Push Back', 'category': 'NTEGE', 'filename': 'ntege.png'},
    {'name': 'Dreadlocks Style', 'category': 'DREADS', 'filename': 'dreads.png'},
    {'name': 'Sharp Line Up', 'category': 'LINE_UP', 'filename': 'lineup.png'},
]

for item in styles_to_add:
    file_path = os.path.join(SEED_DIR, item['filename'])
    if os.path.exists(file_path):
        Style.objects.filter(name=item['name']).delete()
        style = Style(name=item['name'], category=item['category'], is_featured=True)
        with open(file_path, 'rb') as f:
            style.image.save(item['filename'], File(f), save=True)
        print(f"✅ Style Added: {item['name']}")
    else:
        print(f"❌ Missing Image: {item['filename']} (Skipping)")

# --- 2. SEED SERVICES ---
print("\n[2/2] Seeding Services...")
services_to_add = [
    {'name': "Men's Fade", 'description': "Sharp, clean skin fade tailored to your preference.", 'duration_mins': 30, 'price': '15000.00', 'filename': 'mens_fade.png'},
    {'name': "Beard Trim & Shape", 'description': "Precision beard grooming using scissors and straight razor.", 'duration_mins': 20, 'price': '10000.00', 'filename': 'beard_trim.png'},
    {'name': "Kids Haircut", 'description': "Gentle and stylish haircuts for the young gentlemen.", 'duration_mins': 30, 'price': '12000.00', 'filename': 'kids_haircut.png'},
    {'name': "Hair Wash & Style", 'description': "Relaxing wash, condition, and professional styling.", 'duration_mins': 45, 'price': '20000.00', 'filename': 'hair_wash.png'},
    {'name': "Razor Shave", 'description': "Classic hot towel and straight razor shave for a smooth finish.", 'duration_mins': 30, 'price': '18000.00', 'filename': 'razor_shave.png'},
]

for item in services_to_add:
    file_path = os.path.join(SEED_DIR, item['filename'])
    if os.path.exists(file_path):
        Service.objects.filter(name=item['name']).delete()
        service = Service(
            name=item['name'], 
            description=item['description'], 
            duration_mins=item['duration_mins'], 
            price=item['price'],
            is_active=True
        )
        with open(file_path, 'rb') as f:
            service.image.save(item['filename'], File(f), save=True)
        print(f"✅ Service Added: {item['name']}")
    else:
        print(f"❌ Missing Image: {item['filename']} (Skipping)")

print("\n=========================================")
print(" Seeding Complete! Your site is fully populated.")
print("=========================================")
