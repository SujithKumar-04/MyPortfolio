from django.db import models
from django.utils.timezone import now

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    location = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    other_social = models.URLField(blank=True)
    
    def __str__(self):
        return self.name

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('all', 'All'),
        ('web', 'Web App'),
        ('ui', 'UI/UX'),
        ('ecommerce', 'E-commerce'),
    ]
    
    title = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.URLField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='web')
    project_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    display_order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['display_order']
    
    def __str__(self):
        return self.title

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('technical', 'Technical Skills'),
        ('tools', 'Technologies & Tools'),
    ]
    
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='technical')
    proficiency = models.IntegerField(default=0)  # As percentage (0-100)
    icon_class = models.CharField(max_length=50, blank=True)  # For FontAwesome or custom icons
    display_order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['category', 'display_order']
    
    def __str__(self):
        return self.name

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(default=now)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
