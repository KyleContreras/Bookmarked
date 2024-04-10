from rest_framework import serializers
from app.models.book_reviews import BookReview


class BookReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReview
        fields = ['id', 'book', 'user', 'written_review', 'star_rating']
