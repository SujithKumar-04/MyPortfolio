import os
import shutil
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent

# Static files directories
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

print("Copying static files to fix issues...")

# Create static directories if they don't exist
os.makedirs(os.path.join(BASE_DIR, 'static', 'css'), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, 'static', 'js'), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, 'static', 'images'), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, 'static', 'resume'), exist_ok=True)

# Copy app static files to project static files
app_static_dir = os.path.join(BASE_DIR, 'portfolio_app', 'static')
project_static_dir = os.path.join(BASE_DIR, 'static')

# Copy app static files to project static directory
def copy_directory_contents(src, dst):
    if not os.path.exists(src):
        print(f"Source directory {src} does not exist, skipping.")
        return
    
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        
        if os.path.isdir(s):
            os.makedirs(d, exist_ok=True)
            copy_directory_contents(s, d)
        else:
            print(f"Copying {s} to {d}")
            shutil.copy2(s, d)

for item in os.listdir(app_static_dir):
    src_path = os.path.join(app_static_dir, item)
    if os.path.isdir(src_path):
        dst_path = os.path.join(project_static_dir, item)
        os.makedirs(dst_path, exist_ok=True)
        copy_directory_contents(src_path, dst_path)

print("Static files have been copied successfully.")