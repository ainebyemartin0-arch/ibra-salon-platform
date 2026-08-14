import os
import django
from django.core.files import File

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from salon.models import Style

# The folder where you saved the images
SEED_DIR = 'seed'

# The 5 styles we want to add
styles_to_add = [
    {'name': 'Classic Fade', 'category': 'FADES', 'filename': 'fade.jpg'},
    {'name': 'Beard Sculpt', 'category': 'BEARDS', 'filename': 'beard.jpg'},
    {'name': 'Ntege Push Back', 'category': 'NTEGE', 'filename': 'ntege.jpg'},
    {'name': 'Dreadlocks Style', 'category': 'DREADS', 'filename': 'dreads.jpg'},
    {'name': 'Sharp Line Up', 'category': 'LINE_UP', 'filename': 'lineup.jpg'},
]

print("Starting seeding process...")

for item in styles_to_add:
    file_path = os.path.join(SEED_DIR, item['filename'])
    
    if os.path.exists(file_path):
        # Delete existing style with the same name so we don't duplicate if run twice
        Style.objects.filter(name=item['name']).delete()
        
        # Create the new style
        style = Style(name=item['name'], category=item['category'], is_featured=True)
        
        # Open the image file and attach it to the model
        with open(file_path, 'rb') as f:
            style.image.save(item['filename'], File(f), save=True)
            
        print(f"✅ Successfully added: {item['name']}")
    else:
        print(f"❌ Image not found for {item['name']} at {file_path}")

print("Seeding complete!")
