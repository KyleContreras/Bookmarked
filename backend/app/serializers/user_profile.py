from rest_framework import serializers
from app.models.user_profile import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'name', 'profile_picture', 'social_links']
