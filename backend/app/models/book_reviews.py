from django.db import models
from django.contrib.auth.models import User
from app.models.book import Book


class BookReview(models.Model):
    book = models.ForeignKey(Book, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    written_review = models.TextField()
    star_rating = models.DecimalField(max_digits=3, decimal_places=2)
