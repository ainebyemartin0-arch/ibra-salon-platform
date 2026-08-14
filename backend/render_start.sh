#!/usr/bin/env bash
echo "Applying migrations..."
python manage.py migrate
echo "Checking superuser..."
python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='ibra').exists():
    User.objects.create_superuser('ibra', 'admin@example.com', 'salon123')
    print('Superuser created!')
else:
    print('Superuser already exists.')
"
echo "Starting server..."
gunicorn core.wsgi --log-file -
