import os
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .models import Profile, Project, Skill
from .forms import ContactForm

def index(request):
    """Home page view displaying all sections"""
    profile = Profile.objects.first()
    projects = Project.objects.all()[:3]  # Get first 3 projects for showcase
    skills = Skill.objects.filter(category='technical')[:5]  # Get top 5 technical skills
    context = {
        'profile': profile,
        'projects': projects,
        'skills': skills,
        'active_page': 'home'
    }
    return render(request, 'portfolio_app/index.html', context)

def about(request):
    """About page view"""
    profile = Profile.objects.first()
    context = {
        'profile': profile,
        'active_page': 'about'
    }
    return render(request, 'portfolio_app/about.html', context)

def projects(request):
    """Projects page view"""
    projects = Project.objects.all()
    categories = Project.objects.values_list('category', flat=True).distinct()
    context = {
        'projects': projects,
        'categories': categories,
        'active_page': 'projects'
    }
    return render(request, 'portfolio_app/projects.html', context)

def skills(request):
    """Skills page view"""
    technical_skills = Skill.objects.filter(category='technical')
    tools = Skill.objects.filter(category='tools')
    context = {
        'technical_skills': technical_skills,
        'tools': tools,
        'active_page': 'skills'
    }
    return render(request, 'portfolio_app/skills.html', context)

def contact(request):
    """Contact page view"""
    profile = Profile.objects.first()
    form = ContactForm()
    context = {
        'profile': profile,
        'form': form,
        'active_page': 'contact'
    }
    return render(request, 'portfolio_app/contact.html', context)

def download_resume(request):
    """View to handle resume download"""
    profile = Profile.objects.first()
    if profile and profile.resume_file:
        file_path = profile.resume_file.path
        with open(file_path, 'rb') as file:
            response = HttpResponse(file.read(), content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="resume.pdf"'
            return response
    # If no resume is available, return to home
    messages.error(request, "Resume file not available.")
    return redirect('portfolio:index')

def send_message(request):
    """View to handle contact form submission"""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Save to database
            form.save()
            
            # Send email notification
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            
            email_message = f"Name: {name}\nEmail: {email}\n\n{message}"
            
            try:
                send_mail(
                    f"Portfolio Contact: {subject}",
                    email_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.DEFAULT_FROM_EMAIL],
                    fail_silently=False,
                )
                return JsonResponse({'success': True, 'message': 'Your message has been sent successfully!'})
            except Exception as e:
                return JsonResponse({'success': False, 'message': f'Error sending email: {str(e)}'})
        else:
            errors = {field: errors[0] for field, errors in form.errors.items()}
            return JsonResponse({'success': False, 'errors': errors})
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})
