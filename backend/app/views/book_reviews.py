from rest_framework import viewsets, authentication, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.models.book_reviews import BookReview
from app.serializers.book_reviews import BookReviewSerializer


class BookReviewViewSet(viewsets.ModelViewSet):
    queryset = BookReview.objects.all()
    serializer_class = BookReviewSerializer

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_book_review(request):
    user_id = request.query_params.get('user_id')
    book_id = request.query_params.get('book_id')

    if not user_id or not book_id:
        return Response({'error': 'Both user_id and book_id are required'}, status=status.HTTP_400_BAD_REQUEST)

    user_review = BookReview.objects.filter(user_id=user_id, book_id=book_id).first()

    if user_review:
        serialized_reviews = BookReviewSerializer(user_review).data
        return Response(serialized_reviews, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'No reviews found for the specified user and book'}, status=status.HTTP_404_NOT_FOUND)
