#!/usr/bin/env python
"""
This file provides the WSGI application for Gunicorn and 
also supports direct execution to run the Django development server.
"""

import os
import sys
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')

# Import Django WSGI application for Gunicorn
try:
    from django.core.wsgi import get_wsgi_application
    # This is the WSGI application Gunicorn will use
    app = get_wsgi_application()
except ImportError as exc:
    raise ImportError(
        "Couldn't import Django. Are you sure it's installed and "
        "available on your PYTHONPATH environment variable? Did you "
        "forget to activate a virtual environment?"
    ) from exc

# Allow direct execution for development
if __name__ == "__main__":
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # Use port 5000 to match the external port forwarding
    execute_from_command_line(["manage.py", "runserver", "0.0.0.0:5000"])
