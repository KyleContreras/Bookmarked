from rest_framework import viewsets, authentication, permissions, filters
from app.models.book import Book
from app.serializers.book import BookSerializer


#ModelViewSet comes with CRUD out of the box. We will use that to save time
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author', 'isbn']

    # A helper function
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()