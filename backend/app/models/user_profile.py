from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    profile_picture = models.URLField()
    # default = 'Unknown' is temporary
    name = models.TextField(default='Unknown')
    #profile_picture = models.ImageField(upload_to='profile_picture/', blank=True)
    social_links = models.URLField(blank=True)

    def __str__(self):
        return self.user.username
