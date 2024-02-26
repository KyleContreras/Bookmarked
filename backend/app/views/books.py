from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from app.models import Book
from app.serializers import BookSerializer


#ModelViewSet comes with CRUD out of the box. We will use that to save time
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
