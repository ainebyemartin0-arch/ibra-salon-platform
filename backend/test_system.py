import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_system():
    print("=========================================")
    print(" Starting Full-System Connection Test...")
    print("=========================================\n")

    # 1. Health Check
    try:
        res = requests.get(f"{BASE_URL}/health/")
        if res.status_code == 200:
            print("✅ Backend Health: OK (200)")
        else:
            print(f"❌ Backend Health: Failed ({res.status_code})")
            return
    except Exception as e:
        print(f"❌ Backend Health: Connection Error. Is Django running on port 8000? \nError: {e}")
        return

    # 2. Services (Public) - Fetch real IDs
    res = requests.get(f"{BASE_URL}/salon/services/")
    services = res.json()
    if res.status_code == 200 and len(services) > 0:
        print(f"✅ Services API: OK ({len(services)} services found)")
        real_service_id = services[0]['id'] # Get the actual first ID
    else:
        print(f"❌ Services API: Failed or Empty ({res.status_code})")
        return

    # 3. Staff (Public) - Fetch real IDs
    res = requests.get(f"{BASE_URL}/salon/staff/")
    staff = res.json()
    if res.status_code == 200 and len(staff) > 0:
        print(f"✅ Staff API: OK ({len(staff)} barbers found)")
        real_staff_id = staff[0]['id'] # Get the actual first ID
    else:
        print(f"❌ Staff API: Failed or Empty ({res.status_code})")
        return

    # 4. Styles (Public)
    res = requests.get(f"{BASE_URL}/salon/styles/")
    if res.status_code == 200 and len(res.json()) > 0:
        print(f"✅ Styles API: OK ({len(res.json())} styles found)")
    else:
        print(f"❌ Styles API: Failed or Empty ({res.status_code})")

    # 5. Appointments Security Check
    res = requests.get(f"{BASE_URL}/salon/appointments/")
    if res.status_code == 401:
        print("✅ Security Check: OK (Appointments are protected, 401 Unauthorized without token)")
    else:
        print(f"❌ Security Check: Failed (Expected 401, got {res.status_code})")

    # 6. Booking Engine (POST Test) - Using REAL IDs
    test_data = {
        "service": real_service_id,
        "staff": real_staff_id,
        "start_time": "2026-12-01T14:00:00",
        "customer_name": "Test User",
        "customer_phone": "0770000000"
    }
    res = requests.post(f"{BASE_URL}/salon/appointments/create/", json=test_data)
    if res.status_code == 201:
        print(f"✅ Booking Engine: OK (Test appointment created for Service ID: {real_service_id}, Staff ID: {real_staff_id})")
    else:
        print(f"❌ Booking Engine: Failed ({res.status_code} - {res.text})")

    print("\n=========================================")
    print(" Test Complete! If all say OK, the backend is 100% healthy.")
    print("=========================================")

if __name__ == "__main__":
    test_system()
