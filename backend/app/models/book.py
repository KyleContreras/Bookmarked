from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publication_date = models.DateField()
    isbn = models.CharField(max_length=13)
    genre = models.CharField(max_length=100)
    synopsis = models.TextField()
    cover_image_url = models.URLField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    page_count = models.PositiveIntegerField()
