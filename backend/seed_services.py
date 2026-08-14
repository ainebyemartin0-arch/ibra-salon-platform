import os
import django
from django.core.files import File

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from salon.models import Service

SEED_DIR = 'seed'

print("Starting Services seeding process...")

# The 5 services we want to add
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
        # Delete existing service with the same name so we don't duplicate
        Service.objects.filter(name=item['name']).delete()
        
        # Create the new service
        service = Service(
            name=item['name'], 
            description=item['description'], 
            duration_mins=item['duration_mins'], 
            price=item['price'],
            is_active=True
        )
        
        # Open the image file and attach it to the model
        with open(file_path, 'rb') as f:
            service.image.save(item['filename'], File(f), save=True)
            
        print(f"✅ Successfully added: {item['name']}")
    else:
        print(f"❌ Image not found: {item['filename']} (Make sure it's in the 'seed' folder)")

print("Services seeding complete!")
