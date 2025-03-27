from .models import Profile

def portfolio_context(request):
    """Context processor to add profile data to all templates"""
    profile = Profile.objects.first()
    return {
        'site_profile': profile
    }
