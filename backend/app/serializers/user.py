from rest_framework import serializers
from django.contrib.auth.models import User


# Uses the built-in User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # TODO: Eventually link the profile and bookcase user
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
