from rest_framework import serializers
from app.models.bookcase import Bookcase


class BookcaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookcase
        fields = ['user', 'bookcase_title']
