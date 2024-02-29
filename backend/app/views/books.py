from rest_framework import viewsets
from app.models.book_model import Book
from app.serializers.book_serializer import BookSerializer


#ModelViewSet comes with CRUD out of the box. We will use that to save time
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
