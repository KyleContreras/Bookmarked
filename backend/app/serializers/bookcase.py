from rest_framework import serializers
from app.models.bookcase import Bookcase, BooksInBookcase
from app.serializers.book import BookSerializer


class BookcaseSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField()

    class Meta:
        model = Bookcase
        fields = ['id', 'user', 'title', 'books']

    def get_books(self, object):
        entries = BooksInBookcase.objects.filter(bookcase=object)
        books = [entry.book for entry in entries]
        # TODO: pass in this object's user id to BookSerializer
        return BookSerializer(books, many=True).data


class BooksInBookcaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = BooksInBookcase
        fields = ['id', 'book', 'bookcase']
