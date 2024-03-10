from django.db import models
from django.contrib.auth.models import User
from app.models.book import Book


class Bookcase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


# TODO
class BooksInBookcase(models.Model):
    bookcase = models.ForeignKey(Bookcase, related_name='books', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
