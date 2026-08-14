#!/usr/bin/env bash

# 1. Apply database migrations
echo "Applying migrations..."
python manage.py migrate

# 2. Create superuser if it doesn't exist
echo "Checking superuser..."
python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='ibra').exists():
    User.objects.create_superuser('ibra', 'admin@example.com', 'salon123')
    print('Superuser created!')
else:
    print('Superuser already exists.')
"

# 3. Start the web server
echo "Starting server..."
gunicorn core.wsgi --log-file -
