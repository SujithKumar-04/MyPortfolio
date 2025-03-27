#!/usr/bin/env python
"""
This file provides the WSGI application for Gunicorn and 
also supports direct execution to run the Django development server.
"""

import os
import sys
import logging
import shutil
from pathlib import Path

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')

# Fix static files
BASE_DIR = Path(__file__).resolve().parent

# Copy app static files to project static directory
def copy_directory_contents(src, dst):
    if not os.path.exists(src):
        logging.warning(f"Source directory {src} does not exist, skipping.")
        return
    
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        
        if os.path.isdir(s):
            os.makedirs(d, exist_ok=True)
            copy_directory_contents(s, d)
        else:
            logging.debug(f"Copying {s} to {d}")
            shutil.copy2(s, d)

try:
    logging.info("Fixing static files...")
    app_static_dir = os.path.join(BASE_DIR, 'portfolio_app', 'static')
    project_static_dir = os.path.join(BASE_DIR, 'static')
    
    # Create directories if they don't exist
    os.makedirs(os.path.join(project_static_dir, 'css'), exist_ok=True)
    os.makedirs(os.path.join(project_static_dir, 'js'), exist_ok=True)
    os.makedirs(os.path.join(project_static_dir, 'images'), exist_ok=True)
    os.makedirs(os.path.join(project_static_dir, 'resume'), exist_ok=True)
    
    # Copy files
    for item in os.listdir(app_static_dir):
        src_path = os.path.join(app_static_dir, item)
        if os.path.isdir(src_path):
            dst_path = os.path.join(project_static_dir, item)
            os.makedirs(dst_path, exist_ok=True)
            copy_directory_contents(src_path, dst_path)
    
    # Copy to staticfiles
    staticfiles_dir = os.path.join(BASE_DIR, 'staticfiles')
    os.makedirs(staticfiles_dir, exist_ok=True)
    copy_directory_contents(project_static_dir, staticfiles_dir)
    
    logging.info("Static files have been fixed successfully.")
except Exception as e:
    logging.error(f"Error fixing static files: {e}")

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
