import requests

LIVE_URL = "https://ibra-salon-platform.onrender.com/api/salon"

print("=========================================")
print(" Seeding LIVE Render Database...")
print("=========================================\n")

# 1. Seed Barbers
print("[1/3] Seeding Barbers...")
barbers = [
    {"name": "James", "role": "Master Barber", "bio": "Expert in fades and classic cuts.", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop", "is_active": True},
    {"name": "David", "role": "Barber", "bio": "Specialist in beard sculpting and line ups.", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", "is_active": True},
]
for b in barbers:
    res = requests.post(f"{LIVE_URL}/staff/", json=b)
    if res.status_code == 201: print(f"✅ {b['name']} added")
    else: print(f"⚠️ {b['name']} might already exist")

# 2. Seed Services
print("\n[2/3] Seeding Services...")
services = [
    {"name": "Men's Fade", "description": "Sharp, clean skin fade tailored to your preference.", "duration_mins": 30, "price": "15000.00", "image": "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop", "is_active": True},
    {"name": "Beard Trim & Shape", "description": "Precision beard grooming using scissors and straight razor.", "duration_mins": 20, "price": "10000.00", "image": "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop", "is_active": True},
    {"name": "Kids Haircut", "description": "Gentle and stylish haircuts for the young gentlemen.", "duration_mins": 30, "price": "12000.00", "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop", "is_active": True},
    {"name": "Hair Wash & Style", "description": "Relaxing wash, condition, and professional styling.", "duration_mins": 45, "price": "20000.00", "image": "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800&auto=format&fit=crop", "is_active": True},
    {"name": "Razor Shave", "description": "Classic hot towel and straight razor shave for a smooth finish.", "duration_mins": 30, "price": "18000.00", "image": "https://images.unsplash.com/photo-1599351431613-18ef1f6088a3?q=80&w=800&auto=format&fit=crop", "is_active": True},
]
for s in services:
    res = requests.post(f"{LIVE_URL}/services/", json=s)
    if res.status_code == 201: print(f"✅ {s['name']} added")
    else: print(f"⚠️ {s['name']} might already exist")

# 3. Seed Styles
print("\n[3/3] Seeding Styles...")
styles = [
    {"name": "Classic Fade", "category": "FADES", "image": "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop", "is_featured": True},
    {"name": "Beard Sculpt", "category": "BEARDS", "image": "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop", "is_featured": True},
    {"name": "Sharp Line Up", "category": "LINE_UP", "image": "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800&auto=format&fit=crop", "is_featured": True},
    {"name": "Ntege Push Back", "category": "NTEGE", "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop", "is_featured": True},
    {"name": "Dreadlocks Style", "category": "DREADS", "image": "https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=800&auto=format&fit=crop", "is_featured": True},
    {"name": "Kids Style", "category": "FADES", "image": "https://images.unsplash.com/photo-1519415943484-9fa1873496c4?q=80&w=800&auto=format&fit=crop", "is_featured": True},
]
for st in styles:
    res = requests.post(f"{LIVE_URL}/styles/", json=st)
    if res.status_code == 201: print(f"✅ {st['name']} added")
    else: print(f"⚠️ {st['name']} might already exist")

print("\n=========================================")
print(" Live Seeding Complete! Check your Vercel site.")
print("=========================================")
