from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from app.models import Book
from app.serializers import BookSerializer


#ModelViewSet comes with CRUD out of the box but doing it ourself won't hurt. Good learning experience
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)