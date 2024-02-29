from rest_framework import serializers
from app.models.book_model import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'publication_date', 'isbn', 'genre', 'synopsis',
                  'cover_image_url', 'ratings', 'price', 'page_count']
