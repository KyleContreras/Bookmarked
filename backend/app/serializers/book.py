from rest_framework import serializers
from app.models.book import Book
from app.serializers.book_reviews import BookReviewSerializer


class BookSerializer(serializers.ModelSerializer):
    # TODO method serializer with if statement to check for user id
    reviews = BookReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publication_date', 'isbn', 'genre', 'synopsis',
                  'cover_image_url', 'price', 'page_count', 'reviews']
