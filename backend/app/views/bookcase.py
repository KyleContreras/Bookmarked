from rest_framework import viewsets, authentication, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.models.bookcase import Bookcase, BooksInBookcase
# from app.models.user_profile import UserProfile
# from app.serializers.user_profile import UserProfileSerializer
from app.serializers.bookcase import BookcaseSerializer, BooksInBookcaseSerializer


class BookcaseViewSet(viewsets.ModelViewSet):
    queryset = Bookcase.objects.all()
    serializer_class = BookcaseSerializer

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    # Regulate access to HTTP methods
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

    # Check to see if the user can operate on this object
    def check_object_permissions(self, request, obj):
        if request.method not in permissions.SAFE_METHODS and obj.user != request.user:
            raise PermissionDenied("You do not have permission to perform this action.")
        super().check_object_permissions(request, obj)


class BooksInBookcaseViewSet(viewsets.ModelViewSet):
    queryset = BooksInBookcase.objects.all()
    serializer_class = BooksInBookcaseSerializer

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    # Regulate access to HTTP methods
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

    # Check to see if the user can operate on this object
    def check_object_permissions(self, request, obj):
        if request.method not in permissions.SAFE_METHODS and obj.bookcase.user != request.user:
            raise PermissionDenied("You do not have permission to perform this action.")
        super().check_object_permissions(request, obj)


@api_view(['GET'])
def get_user_bookcase(request, user_id):
    one_entry = Bookcase.objects.filter(user=user_id)

    if len(one_entry) == 0:
        return Response({}, status=status.HTTP_404_NOT_FOUND)
    else:
        serialized_data = BookcaseSerializer(one_entry.first())
        serialized_data_two = serialized_data.data
        return Response(serialized_data_two, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_bookcase(request):
    bookcase = Bookcase.objects.filter(user=request.user.id)

    if len(bookcase) is 0:
        return Response({}, status=status.HTTP_404_NOT_FOUND)
    else:
        serialized_data = BookcaseSerializer(bookcase.first())
        serialized_bookcase = serialized_data.data
        return Response(serialized_bookcase, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_book_from_bookcase(request):
    bookcase = BooksInBookcase.objects.filter(bookcase=request.data.get('bookcase'))
    book_to_delete = bookcase.filter(book=request.data.get('book')).delete()

    if book_to_delete:
        return Response({"detail": "Book successfully deleted from bookcase."}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"detail": "Book not found in the specified bookcase."}, status=status.HTTP_404_NOT_FOUND)
